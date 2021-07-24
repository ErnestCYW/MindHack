import React, { useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Styling components
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

// React functional component to render login page
function Login({ setAuth }) {
  const classes = useStyles();

  // Initialising states
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const { email, password } = inputs;

  // inputs destructuring
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Connect to server and attempt user log in
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      // Connect to server with a POST request to log user in
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
        toast.success("login successfully");
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
        <div className={classes.root}>
          <h1 className="text-center my-5">Login to Admin Console</h1>
        </div>

        <div className="form-content-right">
          <form onSubmit={onSubmitForm} className={classes.root}>
            <div className="form-inputs">
              <TextField 
                className="form-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="form-inputs">
              <TextField 
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <Button className="form-input-btn" variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <span className="form-input-login">
              Register <a href="/register">here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
