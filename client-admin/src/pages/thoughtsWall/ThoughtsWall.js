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
<<<<<<< HEAD
      const messages = parseRes.messages;
      console.log(parseRes)
      setName(parseRes.user_name);
      setMessages(JSON.parse(messages));
      
=======
      const messages = JSON.parse(parseRes.messages);
      console.log(parseRes);
      setName(parseRes.user_name);
      setMessages(messages);
>>>>>>> d3a6f88ab7ec5d0dcbc2da88147091c768213228
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <Grid container className={classes.container}>
<<<<<<< HEAD
      <Paper classes={{ root: classes.paperRoot }}>
        {messages}
      </Paper>
=======
      <Paper classes={{ root: classes.paperRoot }}>hello</Paper>
>>>>>>> d3a6f88ab7ec5d0dcbc2da88147091c768213228
    </Grid>
  );
}
