import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function StudentDashboard({ setAuth }) {
  //React hooks for user details, answers to daily questions, and message board posts
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [quote, setQuote] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [answer3, setAnswer3] = useState(null);
  const [answer4, setAnswer4] = useState(null);
  const [answer5, setAnswer5] = useState(null);

  //Function to get user information from backend (name, quote, messages from school, and if user has completed daily quiz)
  const getAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/studentDashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, //from middleware
      });

      const parseRes = await response.json();
      const messages = JSON.parse(parseRes.messages);
      const quote = JSON.parse(parseRes.quote);
      const completed = JSON.parse(parseRes.has_done_daily_declaration);

      setName(parseRes.user_name);
      setMessages(messages);
      setQuote(quote);
      setCompleted(completed);
    } catch (err) {
      console.error(err.message);
    }
  };

  //React hook to call getAll(), runs only once!
  useEffect(() => {
    getAll();
  }, []);

  //Logout function, removes JWT token from local storage
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  //Function to submit daily quiz answers to backend for storage
  const submitAnswers = async () => {
    try {
      await fetch(
        "http://localhost:5000/studentDashboard/submitAnswers/",
        {
          method: "POST",
          headers: {
            token: localStorage.token, //from middleware
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            answer5: answer5,
          },
        }
      );
      setCompleted(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  //JSX element to select survey answers and assign to hooks
  const selectResponse = (setState, name) => {
    return (
      <div>
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="option1"
          onChange={() => setState(1)}
        ></input>
        <label className="form-check-label" for="option1">
          1
        </label>
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="option2"
          onChange={() => setState(2)}
        ></input>
        <label className="form-check-label" for="option2">
          2
        </label>
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="option3"
          onChange={() => setState(3)}
        ></input>
        <label className="form-check-label" for="option3">
          3
        </label>
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="option4"
          onChange={() => setState(4)}
        ></input>
        <label className="form-check-label" for="option4">
          4
        </label>
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id="option5"
          onChange={() => setState(5)}
        ></input>
        <label className="form-check-label" for="option5">
          5
        </label>
      </div>
    );
  };

  //JSX function to get and display quote
  const getQuote = () => {
    return (
      <div>
        <h2>{quote["content"]}</h2>
        <h3>~ {quote["author_name"]}</h3>
      </div>
    );
  };

  //JSX survey element to display survey questions
  const survey = () => {
    if (completed) {
      return <div>{getQuote()}</div>;
    } else {
      return (
        <div>
          <div>How happy are you today?</div>
          {selectResponse(setAnswer1, "q1")}
          <div>How stressed are you today?</div>
          {selectResponse(setAnswer2, "q2")}
          <div>Question3</div>
          {selectResponse(setAnswer3, "q3")}
          <div>Question4</div>
          {selectResponse(setAnswer4, "q4")}
          <div>Question5</div>
          {selectResponse(setAnswer5, "q5")}
          <button
            className="btn btn-primary btn-sm "
            onClick={() => submitAnswers()}
          >
            Submit
          </button>
        </div>
      );
    }
  };

  //JSX Element for user to input message for message board and assign to hooks
  const inputMessage = () => {
    return (
      <div
        className="card border-primary mb-3"
        style={{ width: 400, marginLeft: 15, marginRight: 15 }}
      >
        <form onSubmit={submitMessage}>
          <div className="card-body">
            <textarea
              placeholder="Enter your message here!"
              value={newMessage}
              onChange={(msg) => setNewMessage(msg.target.value)}
              style={styles.input}
            />
          </div>
          <div className="card-footer bg-transparent border-success">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  };

  //Function to submit messages to backend for storage
  const submitMessage = async (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      console.log(newMessage);
      try {
        await fetch(
          "http://localhost:5000/studentDashboard/submitMessage/",
          {
            method: "POST",
            headers: {
              token: localStorage.token, //from middleware
              newMessage: newMessage,
            },
          }
        );
        setNewMessage("");
        getAll(); //Refreshes message so user's new message appears without reloading page
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  //JSX elements styling
  let styles = {
    header: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 60,
      paddingRight: 60,
      backgroundColor: "#5C6BC0",
    },
    headerText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
    },
    button: {
      borderColor: "white",
      borderWidth: 2,
      backgroundColor: "#5C6BC0",
      color: "white",
      marginLeft: 20,
    },
    input: {
      width: "342px",
      height: "150px",
    },
  };

  //JSX Return Element
  return (
    <div>
      <div className="d-flex justify-content-between" style={styles.header}>
        <div style={styles.headerText}>MindHack</div>
        <div className="d-flex justify-content-between">
          <div style={styles.headerText}>Welcome {name}!</div>
          <button
            className="btn btn-primary btn-sm "
            onClick={(e) => logout(e)}
            id="logout"
            style={styles.button}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="row">
        <nav
          id="sidebarMenu"
          className="col-md-3 d-md-block sidebar collapse position-fixed shadow p-3 mb-5 rounded bg-light"
          style={{ height: "100vh" }}
        >
          {survey()}
        </nav>
      </div>

      <div className="col-md-9 ms-sm-auto px-md-4">
        <div className="row row-cols-1 row-cols-md-2 g-4" style={{ marginTop: 10 }}>
          {messages.map((message) => {
            return (
              <div
                className="card border-primary mb-3"
                style={{ width: 400, marginLeft: 15, marginRight: 15 }}
              >
                <div className="card-body">
                  <h5 className="card-title">{message.message_content}</h5>
                </div>
                <div className="card-footer bg-transparent border-success">
                  <div>{message.school_name}</div>
                  <div>{message.date_time}</div>
                </div>
              </div>
            );
          })}
          {inputMessage()}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
