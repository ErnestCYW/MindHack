import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function StudentDashboard({ setAuth }) {
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
      console.log(quote);

      setName(parseRes.user_name);
      setMessages(messages);
      setQuote(quote);
      setCompleted(completed);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const getQuote = () => {
    return (
      <div>
        <h2>{quote["content"]}</h2>
        <h3>~ {quote["author_name"]}</h3>
      </div>
    );
  };

  const logout = (e) => {
    e.preventDefault();
    console.log("Triggered");
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  const submitAnswers = async () => {
    try {
      const response = await fetch(
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

  const selectResponse = (setState, name) => {
    return (
      <div class={"d-flex flex-row"}>
        <div style={styles.check}>
          <input
            class="form-check-input"
            type="radio"
            name={name}
            id="option1"
            onChange={() => setState(1)}
          ></input>
          <label class="form-check-label" for="option1">
            <pre> 1</pre>
          </label>
        </div>
        <div style={styles.check}>
        <input
          class="form-check-input"
          type="radio"
          name={name}
          id="option2"
          onChange={() => setState(2)}
        ></input>
        <label class="form-check-label" for="option2">
        <pre> 2</pre>
        </label>
        </div>
        <div style={styles.check}>
        <input
          class="form-check-input"
          type="radio"
          name={name}
          id="option3"
          onChange={() => setState(3)}
        ></input>
        <label class="form-check-label" for="option3">
        <pre> 3</pre>
        </label>
        </div>
        <div style={styles.check}>
        <input
          class="form-check-input"
          type="radio"
          name={name}
          id="option4"
          onChange={() => setState(4)}
        ></input>
        <label class="form-check-label" for="option4">
        <pre> 4</pre>
        </label>
        </div>
        <div style={styles.check}>
        <input
          class="form-check-input"
          type="radio"
          name={name}
          id="option5"
          onChange={() => setState(5)}
        ></input>
        <label class="form-check-label" for="option5">
        <pre> 5</pre>
        </label>
        </div>
      </div>
    );
  };

  const survey = () => {
    if (completed) {
      return <div>{getQuote()}</div>;
    } else {
      return (
        <div style={styles.question}>
          <h2>Daily Check</h2>
          <div style={styles.question}>
            <div>How happy are you today?</div>
            {selectResponse(setAnswer1, "q1")}
          </div>
          <div style={styles.question}>
            <div>How stressed are you today?</div>
            {selectResponse(setAnswer2, "q2")}
          </div>
          <div style={styles.question}>
            <div>How well are you coping today?</div>
            {selectResponse(setAnswer3, "q3")}
          </div>
          <div style={styles.question}>
            <div>To what extent do you think you need help?</div>
            {selectResponse(setAnswer4, "q4")}
          </div>
          <div style={styles.question}>
            <div>Are you okay?</div>
            {selectResponse(setAnswer5, "q5")}
          </div>
          <button
            className="btn btn-primary btn-sm "
            onClick={() => submitAnswers()}
            style={{marginTop: 10}}
          >
            Submit
          </button>
        </div>
      );
    }
  };

  const inputMessage = () => {
    return (
      <div class="card border-primary mb-3" style={{width: 400, marginLeft: 15, marginRight: 15,}}>
      <form onSubmit={submitMessage}>
        <div class="card-body">
          <textarea
            placeholder="Enter your message here!"
            value={newMessage}
            onChange={(msg) => setNewMessage(msg.target.value)}
            style={styles.input}
          />
          </div>
          <div class="card-footer bg-transparent border-success">
          <input type="submit" value="Submit" className="btn btn-primary"/>
          </div>
        </form> 
      </div>
    );
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    if (newMessage!=="") {
      console.log(newMessage);
      try {
        const response = await fetch(
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
        getAll();
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  let styles = {
    header: {
      paddingTop: 20,
      paddingBottom: 20, 
      paddingLeft: 60,
      paddingRight: 60,
      backgroundColor: '#5C6BC0',
    },
    headerText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
    },
    button: {
      borderColor: 'white',
      borderWidth: 2,
      backgroundColor: '#5C6BC0',
      color: 'white',
      marginLeft: 20,
    },
    input: {
      width : "342px",
      height : "150px",
    },
    question: {
    },
    check: {
      paddingRight: 10,
    }
  }

  return (
    <div>
      <div class="d-flex justify-content-between" style={styles.header}>
        <div style={styles.headerText}>MindHack</div>
        <div class="d-flex justify-content-between" >
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
      <div class="row justify-content-around" style={{marginTop: 30,}}>
      <div class="col-2">
        {survey()}
      </div>

      <div class="col-9">
      <div class="row">
        {messages.map((message) => {
              return (
                <div class="card border-primary mb-5" style={{width: 400, marginLeft: 15, marginRight: 15,}}>
                  <div class="card-body">
                    <h5 class="card-title">{message.message_content}</h5>
                  </div>
                  <div class="card-footer bg-transparent border-success">
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
    </div>
  );
}

export default StudentDashboard;