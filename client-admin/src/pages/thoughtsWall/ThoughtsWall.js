import React, { useState, useEffect } from "react";
import { Grid, Paper } from "@material-ui/core";


// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

export default function ThoughtsWall() {
  var classes = useStyles();
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);

  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/studentDashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();
      const messages = parseRes.messages;
      console.log(parseRes)
      setName(parseRes.user_name);
      setMessages(JSON.parse(messages));
      
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect( () => {
    getAll();
  }, []);

  return (
    <Grid container className={classes.container}>
      <Paper classes={{ root: classes.paperRoot }}>
        {messages}
      </Paper>
    </Grid>
  );
}
