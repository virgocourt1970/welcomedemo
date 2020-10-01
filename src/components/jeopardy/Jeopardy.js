import React, { Component } from "react";
//import our service
import JeopardyService from "../../JeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: { category: {} },
      score: 0,
      formData: {
        answer: "",
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
    let userData = this.state.formData.answer;
    let realData = this.state.data.answer;
    if (userData === realData) {
      this.setState((prvState) => {
        return {
          score: prvState.score + this.state.data.value,
        };
      });

      console.log("correct answer");
    } else {
      this.setState((prvState) => {
        return {
          score: prvState.score - this.state.data.value,
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
        {JSON.stringify(this.state.data)}
        <h2> {this.state.data.question}</h2>
        <h2> ${this.state.data.value}</h2>
        <h2> category: {this.state.data.category.title} </h2>
        <h2>score: {this.state.score}</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="answer">submit answer</label>
            <input
              type="text"
              name="answer"
              value={this.state.formData.answer}
              onChange={this.handleChange}
            />
          </div>

          <button>Subnit Form</button>
        </form>
      </div>
    );
  }
}
export default Jeopardy;
