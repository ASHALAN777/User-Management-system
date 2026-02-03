import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import Main from "../inpages/Main1";
import "../css/Admin.css";
import { Outlet } from "react-router-dom";
import Navbar from "../inpages/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Customhooks/AuthProvider";
import EMSidebar from "../inpages/Employe Sidebar ";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div>
      <div style={{ display: "flex", height: "100vh" }}>
        <EMSidebar />

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Navbar />

          <div style={{ flex: 1, overflowY: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
