import React, { useState, useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";

// styles
import useStyles from "./styles";

export default function ThoughtsWall() {
  var classes = useStyles();
  const [messages, setMessages] = useState([]);

  // Connect with server to for the retrieval of the following information from db
  //    - messages from the wall
  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/studentDashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();
      const messages = JSON.parse(parseRes.messages);

      setMessages(messages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
    <div className={classes.root}>
      <PageTitle title="Thoughts Wall" />
      <Grid container spacing={3}>
        
        {messages.map((msg) => {
          return (
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Paper classes={{ root: classes.paperRoot }}>
              {msg.message_content}
            </Paper>
          </Grid>
          );
        })}
        
      </Grid>
    </div>
    </>
  );
}
