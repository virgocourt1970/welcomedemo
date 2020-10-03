import React, { Component } from "react";
import Clue from "../Clue/Clue";
//import our service
import JeopardyService from "../../JeopardyService";

class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {
        question: "",
        value: 0,
        category: {
          title: "",
        },
      },
      score: 0,
      formData: {
        guess: "",
      },
    };
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      console.log(result);
      this.setState({
        data: result.data[0],
      });
    });
  }

  handleChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("test");
    let userGuess = this.state.formData.guess;
    let realAnswer = this.state.data.answer;

    if (userGuess === realAnswer) {
      this.setState((previousState) => {
        return {
          score: previousState.score + this.state.data.value,
        };
      });
      console.log("correct answer");
    } else {
      this.setState((previousState) => {
        return {
          score: previousState.score - this.state.data.value,
        };
      });
      console.log("incorrect answer");
    }
    this.getNewQuestion();
  };
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  //display the results on the screen
  render() {
    return (
      <div>
        <Clue
          question={this.state.data.question}
          value={this.state.data.value}
          category={this.state.data.category.title}
          score={this.state.score}
          guess={this.state.formData.guess}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
export default Jeopardy;
