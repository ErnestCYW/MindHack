import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Menu } from "@material-ui/core";
import {
  Menu as MenuIcon,
  AccountCircle as AccountIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

export default function Header(props) {
  var classes = useStyles();
  const setAuth = props.setAuth;
  console.log(setAuth);

  const logout = (e) => {
    e.preventDefault();
    console.log("Triggered");
    localStorage.removeItem("token");
    window.location.reload();
  };

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [profileMenu, setProfileMenu] = useState(null);
  const [user, setUser] = useState("");
  const [school, setSchool] = useState("")

  // getAll is a function call to the server for retrieval from database
  //    in this case, retrieving the user_name and school for a more peronalised UX
  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/adminDashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      const user_name = parseRes.user_name;
      const school = parseRes.school;
      setUser(user_name);
      setSchool(school);
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          MindHack Overview for <b>{school}</b>
        </Typography>
        <div className={classes.grow} />

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>

        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {user}
            </Typography>
          </div>

          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              // onClick={() => signOut(userDispatch, props.history)}
              onClick={(e) => logout(e)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
