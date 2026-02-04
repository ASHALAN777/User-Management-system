import React from "react";
import "../inpages-src/mainboard.css";

import { useState, useEffect } from "react";

const Mainboard = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/auth`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUsers(data); // assuming data is array
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  // ✅ filter employee users
  const employeeUsers = users.filter((user) => user.role === "Employee");
  const employeeLeave = employeeUsers.filter(
    (employeeUsers) => employeeUsers.leaveStatus === "Approved",
  );

  return (
    <div className="complete1">
      <div>
        <div className="Container">
          <div className="Four">
            <div className="Cardu">
              Total Employee
              <div className="Numberu">{employeeUsers.length}</div>
            </div>
            <div className="Cardu">
              Leave Count <div className="Numberu">{employeeLeave.length}</div>
            </div>
            <div className="Cardu">
              Profile <div className="Numberu">{employeeLeave.length}</div>
            </div>
            <div className="Cardu">
              undefined <div className="Numberu">{employeeLeave.length}</div>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="taable-container">
        <div className="hey">
          <div className="table-drapper no-scrollbar">
            <table className="user-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Salary</th>
                  <th>Joining Date</th>
                  <th>Leave</th>
                </tr>
              </thead>
              <tbody>
                {employeeUsers.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.salary || "n/a"}</td>
                    <td>
                      {user.CreatedAt
                        ? new Date(user.CreatedAt).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td>{user.leaveStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainboard;
