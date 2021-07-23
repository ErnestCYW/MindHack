import React, { useState } from "react";
import { toast } from "react-toastify";
import School_Options from "./School_Options";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    password2: "",
    name: "",
    school: "",
  });
  const [errors, setErrors] = useState({});

  //destructure
  const { email, password, password2, name, school } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    console.log(inputs);

    try {
      const body = { email, password, password2, name, school };

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
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1459449445009-a5850a578470?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        overflowY: "hidden",
      }}
    >
      <div className="d-flex form-container" style={{ height: "50vh" }}>
        <div className="d-flex form-content-left justify-content-center align-items-center bg-light">
          <h1 className="text-center m-5 display-4">Register</h1>
        </div>

        <div className="form-content-right d-flex form-content-left justify-content-center align-items-center bg-dark">
          <form onSubmit={onSubmitForm} className="form m-5">
            <div className="form-inputs d-flex justify-content-between align-items-center">
              <label htmlFor="email" className="form-label text-white m-3">
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

            <div className="form-inputs d-flex justify-content-between align-items-center">
              <label htmlFor="password" className="form-label text-white m-3">
                Password
              </label>
              <input
                className="form-input "
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>

            <div className="form-inputs d-flex justify-content-between align-items-center">
              <label htmlFor="password2" className="form-label text-white m-3">
                Confirm Password
              </label>
              <input
                className="form-input"
                id="password2"
                type="password"
                name="password2"
                placeholder="Confirm your password"
                value={password2}
                onChange={(e) => onChange(e)}
              />
              {errors.password2 && <p>{errors.password2}</p>}
            </div>

            <div className="form-inputs d-flex justify-content-between align-items-center">
              <label htmlFor="name" className="form-label text-white m-3">
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

            <div className="form-inputs d-flex justify-content-between align-items-center">
              <label htmlFor="school" className="form-label text-white m-3">
                School
              </label>
              <input
                className="form-input"
                id="school"
                type="text"
                name="school"
                placeholder="Enter your school"
                value={school}
                list="anrede"
                onChange={(e) => onChange(e)}
              />
              {errors.school && <p>{errors.school}</p>}
            </div>
            <datalist id="anrede">
              {School_Options.map((school) => {
                return <option value={school}></option>;
              })}
            </datalist>

            <div className="d-flex justify-content-between align-items-center">
              <button
                className="form-input-btn btn btn-primary my-3 "
                type="submit"
              >
                Submit
              </button>

              <span className="form-input-login text-white m-3">
                Already have an account? Login <a href="/login">here</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
