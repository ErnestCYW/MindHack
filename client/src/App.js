import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//Custom components
import Login from "./components/Login";
import Register from "./components/Register";
import StudentDashboard from "./components/StudentDashboard";

//Toast appears at top right as alerts
toast.configure();

function App() {
  //React hooks to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Function to set if user is authenticaed, can be passed into other components
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //Function to check if user is authenticated, sets the react hook
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  //Use effect to check if user is authenicated, runs once per page refresh
  useEffect(() => {
    isAuth();
  });

  //JSX return element with switch statements to redirect to components
  return (
    <Fragment>
      <Router>
        <div>
          <Switch>
          <Route
              exact
              path="/"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/studentDashboard" />
                )
              }
            />
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/studentDashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/studentDashboard" />
                )
              }
            />
            <Route
              exact
              path="/studentDashboard"
              render={(props) =>
                localStorage.token ? (
                  <StudentDashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
