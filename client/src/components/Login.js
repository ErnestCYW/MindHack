import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  //React hooks for errors and inputs
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const [errors, setErrors] = useState({});

  //Function to handle change in inputs for text fields, assign to hooks
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //Function to submit login data to backend for verification, returns a JWT token with payload for storage in browser if successful
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login successful");
      } else {
        setAuth(false);
        setErrors(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  //JSX Return Element
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1457131760772-7017c6180f05?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1336&q=80')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <div className="d-flex form-container" style={{ height: "50vh" }}>
        <div className="d-flex form-content-left justify-content-center align-items-center bg-light">
          <h1 className="text-center m-5 display-4">Login</h1>
        </div>

        <div className="form-content-right d-flex form-content-left justify-content-center align-items-center bg-dark">
          <form onSubmit={onSubmitForm} className="form m-5">
            <div className="form-inputs d-flex justify-content-between align-items-center">
              <label htmlFor="email" className="form-label text-white m-4">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => onChange(e)} //allows you to type your email!
              />
              {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="form-inputs d-flex justify-content-between align-items-center">
              <label htmlFor="password" className="form-label text-white m-4">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => onChange(e)} //allows you to type your password!
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="form-input-btn btn btn-warning m-4"
                type="submit"
              >
                Submit
              </button>
              <span className="form-input-login text-white m-4">
                Don't Have An Account? Register <a href="/register">here</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
