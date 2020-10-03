import React from "react";

/* USAGE:
  <Clue
     question={insert "question" value here}
     value={insert "value" value here}
     category={insert "category title" value here}
     score={insert "score" value here}
  />
*/
function Clue(props) {
  return (
    <div className="Clue">
      <h2>Question: {props.question}</h2>
      <h2>Value: ${props.value}</h2>
      <h2>Category: {props.category}</h2>
      <h2>Score: {props.score}</h2>
      <br />
      <form onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor="answer">Answer</label>
          <input
            type="text"
            name="guess"
            value={props.guess}
            onChange={props.handleChange}
          />
        </div>

        <button>Submit Guess</button>
      </form>
    </div>
  );
}

export default Clue;
