import React, { useState } from "react";
import { toast } from "react-toastify";

function StudentDashboard({ setAuth }) {

  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [answer3, setAnswer3] = useState(null);
  const [answer4, setAnswer4] = useState(null);
  const [answer5, setAnswer5] = useState(null);

  const logout = (e) => {
    e.preventDefault();
    console.log("Triggered");
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };

  const submit = () => {
    const results = {
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      answer5: answer5
    }
    console.log(results);
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


  return (
    <div>
      <div>
      Student Dashboard
      <button
        className="btn btn-primary btn-sm "
        onClick={(e) => logout(e)}
        id="logout"
      >
        Logout
      </button>
      </div>
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
  );
}

export default StudentDashboard;
