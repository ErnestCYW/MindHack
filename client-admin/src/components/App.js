import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Layout from "./Layout";

// pages
import Login from "../pages/login";
import Register from "../pages/register";

toast.configure();

//React Functional Component to be rendered
export default function App() {
  // global
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //helper to set Auth
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //Connecting with server to do a GET request to confirm if user is verified
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      console.log(isAuthenticated);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  // React life cycle hook to determine authentication state on refresh
  useEffect(() => {
    isAuth();
  });

  return (
    <Router>
      <Switch>
      <Route
          exact
          path="/"
          render={(props) =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/app/dashboard" />
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
              <Redirect to="/app/dashboard" />
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
              <Redirect to="/app/dashboard" />
            )
          }
        />

        <Route
          exact
          path="/app"
          render={(props) =>
            localStorage.token ? (
              <Redirect to="/app/dashboard" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />

        <PrivateRoute path="/app" component={Layout} setAuth={setAuth} />
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/login" component={Login} />
      </Switch>
    </Router>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
