import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";

// styles
import useStyles from "./styles";

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
      const messages = JSON.parse(parseRes.messages);

      setName(parseRes.user_name);
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
      <PageTitle title="Thoughts Wall" />
      {messages.map((msg) => {
        return (
          <Paper classes={{ root: classes.paperRoot }}>
            {msg.message_content}
            <hr />
            {name}
          </Paper>
        );
      })}
    </>
  );
}
