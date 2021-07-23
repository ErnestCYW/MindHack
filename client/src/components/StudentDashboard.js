import React from "react";
import { toast } from "react-toastify";

function StudentDashboard({ setAuth }) {
  const logout = (e) => {
    e.preventDefault();
    console.log("Triggered");
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };
  return (
    <div>
      <button
        className="btn btn-primary btn-sm "
        onClick={(e) => logout(e)}
        id="logout"
      >
        Logout
      </button>
      Student Dashboard
    </div>
  );
}

export default StudentDashboard;
