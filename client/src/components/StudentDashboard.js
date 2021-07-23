import React, {useState, useEffect} from "react";
import { toast } from "react-toastify";

function StudentDashboard({ setAuth }) {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
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

      setName(parseRes.user_name);
      setMessages(messages)
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect( () => {
    getAll();
  }, []);

  console.log(messages);

  const logout = (e) => {
    e.preventDefault();
    console.log("Triggered");
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  const submit = async () => {
    try{
      const results = {
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        answer5: answer5
      }
      console.log(results);
    } catch (err) {
        console.log(err.message);
    }
  }

  const selectResponse = (setState, name) => {
    return(
      <div>
      <input class="form-check-input" type="radio" name={name} id="option1" onChange={() => setState(1)}></input>
        <label class="form-check-label" for="option1">
        1
        </label>
        <input class="form-check-input" type="radio" name={name} id="option2" onChange={() => setState(2)}></input>
        <label class="form-check-label" for="option2">
        2
        </label>
        <input class="form-check-input" type="radio" name={name} id="option3" onChange={() => setState(3)}></input>
        <label class="form-check-label" for="option3">
        3
        </label>
        <input class="form-check-input" type="radio" name={name} id="option4" onChange={() => setState(4)}></input>
        <label class="form-check-label" for="option4">
        4
        </label>
        <input class="form-check-input" type="radio" name={name} id="option5" onChange={() => setState(5)}></input>
        <label class="form-check-label" for="option5">
        5
        </label>
      </div>
    )
  }

  const completed = true;

  const survey = () => {
    if (completed) {
      return(
        <div>
          <h2>Quote of the day!</h2>
        </div>
      )
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
          {selectResponse(setAnswer5, 'q5')}
          <button
            className="btn btn-primary btn-sm "
            onClick={() => submit()}
            id="submit"
          >Submit</button>
        </div>
      )
    }
  }

  return (
    <div>
      <div className="display-1">Student Dashboard</div>
      <div className="display-4 bg-warning">
        Student name: {name}
      </div>
      <div className="bg-info">
        {messages.map(message => {
          return <div> school: {message.school_name} time: {message.date_time} contents: {message.message_content} </div>
        })}
      </div>
      <button
        className="btn btn-primary btn-sm "
        onClick={(e) => logout(e)}
        id="logout"
      >
        Logout
      </button>
      {survey()}
      </div>
  );
}

export default StudentDashboard;
