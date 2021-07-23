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
      <div>
      Student Dashboard
      <button
        className="btn btn-primary btn-sm "
        onClick={(e) => logout(e)}
        id="logout"
      >
        Logout
      </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
