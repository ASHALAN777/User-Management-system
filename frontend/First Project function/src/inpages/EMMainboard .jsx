import React from "react";
import "../inpages-src/emmainboard.css";
import { useContext } from "react";
import { AuthContext } from "../Customhooks/AuthProvider";

import { useState, useEffect } from "react";

const EMMainboard = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          credentials: "include", //
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          console.error("Not logged in");
          return;
        }

        const data = await res.json();
        setUserData(data);
        console.log("Data from server:", data);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    fetchUserData();
  }, []);

  const [fromdate, setFromdate] = useState("");
  const [todate, setTodate] = useState("");
  const [leavereason, setLeavereason] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    // const formattedFromDate = new Date(fromdate).toISOString();
    // const formattedToDate = new Date(todate).toISOString();

    const leavedata = {
      leavefromdate: fromdate,
      leavetodate: todate,
      leavereason: leavereason,
    };

    try {
      const res = await fetch(`${API_URL}/auth/leave/${user._id}/apply`, {
        method: "POST",
        credentials: "include", //
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leavedata),
      });
      console.log(leavedata);
      if (res.ok) {
        alert("Leave applied successfully!");
      } else {
        alert("Error: " + resultData.message);
      }
    } catch (error) {}
  };

  const employeeuser = userData?.user || {};
  const leave = userData?.user?.leaves || [];

  const approvedCount = leave.filter((l) => l.status === "Approved").length;
  const pendingCount = leave.filter((l) => l.status === "Applied").length;
  const rejectedCount = leave.filter(
    (l) => l.status === "Rejected" || l.status === "Expired",
  ).length;
  return (
    <div className="bodyem">
      <div>
        <div className="Container1">
          <div className="Four1">
            <div className="Cardu1">
              Total Leave
              <div className="Numberu1">{leave.length}</div>
            </div>
            <div className="Cardu2">
              Approved Leave <div className="Numberu1">{approvedCount}</div>
            </div>
            <div className="Cardu3">
              Pending Leave <div className="Numberu1">{pendingCount}</div>
            </div>
            <div className="Cardu4">
              Rejected Leave <div className="Numberu1">{rejectedCount}</div>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="summavey1">
        <div className="emapplyleave1">
          <div className="dappa1">
            <h3>Apply for leave</h3>
            <div>
              <p>Leave reason</p>{" "}
              <input
                type="text"
                placeholder="type your reason here "
                value={leavereason}
                onChange={(e) => setLeavereason(e.target.value)}
              />
              <p>From</p>
              <input
                type="date"
                placeholder="dd/mm/yy"
                value={fromdate}
                onChange={(e) => setFromdate(e.target.value)}
              />
              <p>To</p>{" "}
              <input
                type="date"
                placeholder="dd/mm/yy "
                value={todate}
                onChange={(e) => setTodate(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handlesubmit}>Apply</button>
            </div>
          </div>
        </div>
        <div className="emstatus">
          <h3> Leave status</h3>
          <table className="dappa2">
            <thead>
              <tr>
                <th>Noo</th>
                <th> Applied date</th>
                <th>Leave reason</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className="lord">
              {leave.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {" "}
                      {new Date(item?.leavedate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{item?.leavereason}</td>
                    <td>
                      {new Date(item?.leavefromdate).toLocaleDateString(
                        "en-GB",
                      )}{" "}
                      -{" "}
                      {new Date(item?.leavetodate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{item?.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EMMainboard;
