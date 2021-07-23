import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    name: "",
  });
  const [errors, setErrors] = useState({});

  //destructure
  const { email, username, password, password2, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, username, password, password2, name };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        setErrors(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="authentication">
      <div className="form-container">
        <div className="form-content-left">
          <h1 className="text-center my-5">Register</h1>
        </div>

        <div className="form-content-right">
          <form onSubmit={onSubmitForm} className="form">
            <div className="form-inputs">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                className="form-input"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => onChange(e)}
              />
              {errors.username && <p>{errors.username}</p>}
            </div>

            <div className="form-inputs">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="form-inputs">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-input"
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>

            <div className="form-inputs">
              <label htmlFor="password2" className="form-label">
                Confirm Password
              </label>
              <input
                className="form-input"
                id="password2"
                type="password2"
                name="password2"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => onChange(e)}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>

            <div className="form-inputs">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className="form-input"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => onChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>

            <button className="form-input-btn" type="submit">
              Submit
            </button>

            <span className="form-input-login">
              Already have an account? Login <a href="/login">here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
