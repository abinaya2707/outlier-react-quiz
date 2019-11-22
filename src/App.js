import React from "react";
import "./App.css";
import { Rating } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Progress } from "semantic-ui-react";
let mockedQuestions = require("./questions.json");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isQuizDone: false,
      buttonClassOne: false,
      buttonClassTwo: false,
      buttonClassThree: false,
      buttonClassFour: false,
      questions: [],
      question: null,
      currentScore: 0,
      correctPredictedScore: 0,
      inCorrectPredictedScore: 0
    };
  }

  componentDidMount() {
    let i = 1;
    for (let question of mockedQuestions) {
      question.selected = false;
      question.position = i++;
      question.difficulty =
        question.difficulty === "hard"
          ? 3
          : question.difficulty === "medium"
          ? 2
          : question.difficulty === "easy"
          ? 1
          : 0;
      question.question = unescape(question.question);
      question.options = question.incorrect_answers;
      question.isAnswered = "NO";
      let arr = question.incorrect_answers;
      arr.push(question.correct_answer);
      question.options = arr.sort(() => Math.random() - 0.5);
      question.correctIndex = question.options.indexOf(question.correct_answer);
    }
    mockedQuestions[0].selected = true;

    let question = mockedQuestions.filter(item => item.selected === true);
    if (question.length > 0) {
      question = question[0];
    }

    this.setState({
      questions: mockedQuestions,
      question: question
    });
  }

  changeOptionOne(question) {
    if (question.correct_answer === question.options[0]) {
      question.isAnswered = "CORRECT";
      this.setState({
        question: question
      });
    } else {
      question.isAnswered = "INCORRECT";
      this.setState({
        question: question
      });
    }
    this.setState({
      buttonClassOne: !this.state.buttonClassOne,
      buttonClassTwo: this.state.buttonClassTwo,
      buttonClassThree: this.state.buttonClassThree,
      buttonClassFour: this.state.buttonClassFour
    });
  }

  changeOptionTwo(question) {
    if (question.correct_answer === question.options[1]) {
      question.isAnswered = "CORRECT";
      this.setState({
        question: question
      });
    } else {
      question.isAnswered = "INCORRECT";
      this.setState({
        question: question
      });
    }
    this.setState({
      buttonClassTwo: !this.state.buttonClassTwo,
      buttonClassOne: false,
      buttonClassThree: false,
      buttonClassFour: false
    });
  }

  changeOptionThree(question) {
    if (question.correct_answer === question.options[2]) {
      question.isAnswered = "CORRECT";
      this.setState({
        question: question
      });
    } else {
      question.isAnswered = "INCORRECT";
      this.setState({
        question: question
      });
    }
    this.setState({
      buttonClassThree: !this.state.buttonClassThree,
      buttonClassTwo: false,
      buttonClassOne: false,
      buttonClassFour: false
    });
  }

  changeOptionFour(question) {
    if (question.correct_answer === question.options[3]) {
      question.isAnswered = "CORRECT";
      this.setState({
        question: question
      });
    } else {
      question.isAnswered = "INCORRECT";
      this.setState({
        question: question
      });
    }
    this.setState({
      buttonClassFour: !this.state.buttonClassFour,
      buttonClassTwo: false,
      buttonClassThree: false,
      buttonClassOne: false
    });
  }

  changeNextQuestion(question) {
    if (question.position === this.state.questions.length) {
      this.setState({
        isQuizDone: true
      });
    } else {
      let questions = this.state.questions;
      questions[question.position - 1].selected = false;
      questions[question.position].selected = true;

      let totalCount = questions.length;
      let correct = questions.filter(item => item.isAnswered === "CORRECT")
        .length;
      let incorrect = questions.filter(item => item.isAnswered === "INCORRECT")
        .length;
      let answeredCount = correct + incorrect;

      let currentScore = (correct / answeredCount) * 100 || 0;
      let correctPredictedScore = ((totalCount - incorrect) / totalCount) * 100;
      let inCorrectPredictedScore = (correct / totalCount) * 100;

      this.setState({
        questions: questions,
        buttonClassOne: false,
        buttonClassTwo: false,
        buttonClassThree: false,
        buttonClassFour: false,
        currentScore: Math.round(currentScore),
        correctPredictedScore: Math.round(correctPredictedScore),
        inCorrectPredictedScore: Math.round(inCorrectPredictedScore),
        question: questions[question.position]
      });
    }
  }

  render() {
    let optionOneClass = this.state.buttonClassOne
      ? "blackButton"
      : "whiteButton";
    let optionTwoClass = this.state.buttonClassTwo
      ? "blackButton"
      : "whiteButton";
    let optionThreeClass = this.state.buttonClassThree
      ? "blackButton"
      : "whiteButton";
    let optionFourClass = this.state.buttonClassFour
      ? "blackButton"
      : "whiteButton";
    let correctAnswer = "correctAnswer";
    let inCorrectAnswer = "inCorrectAnswer";
    let { questions, question } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <div className="quizBox">
            {this.state.isQuizDone ? (
              <div>
                <h4 className="congrats-text">Congrats! You are done.</h4>
              </div>
            ) : (
              <div>
                {question && question.question && (
                  <div>
                    <div>
                      <Progress
                        percent={(question.position / questions.length) * 100}
                        active
                      >
                        Active
                      </Progress>
                    </div>
                    <div className="quizBoxTitle">
                      <h3 className="quizBoxTitleText">
                        Question {question.position} of {questions.length}
                      </h3>
                      <span className="quizBoxSubTitleText">
                        Entertainment: Board Games
                      </span>
                      <br />
                      <Rating
                        className="titleRating"
                        rating={question.difficulty}
                        defaultRating={0}
                        maxRating={3}
                        disabled
                      />

                      <br />
                    </div>

                    <div className="questionText">
                      <h5>{question.question}</h5>
                    </div>

                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <Button
                          disabled={question.isAnswered === "NO" ? false : true}
                          onClick={e => this.changeOptionOne(question)}
                          className={
                            question.isAnswered === "NO"
                              ? optionOneClass
                              : question.correctIndex === 0
                              ? correctAnswer
                              : inCorrectAnswer
                          }
                          style={{
                            marginRight: "15%"
                          }}
                          variant="outline-secondary"
                        >
                          {unescape(question.options[0])}{" "}
                        </Button>
                        <Button
                          disabled={question.isAnswered === "NO" ? false : true}
                          onClick={e => this.changeOptionTwo(question)}
                          className={
                            question.isAnswered === "NO"
                              ? optionTwoClass
                              : question.correctIndex === 1
                              ? correctAnswer
                              : inCorrectAnswer
                          }
                          variant="outline-secondary"
                        >
                          {unescape(question.options[1])}{" "}
                        </Button>
                        <br />
                        <br />
                        <Button
                          disabled={question.isAnswered === "NO" ? false : true}
                          onClick={e => this.changeOptionThree(question)}
                          style={{
                            marginRight: "15%"
                          }}
                          className={
                            question.isAnswered === "NO"
                              ? optionThreeClass
                              : question.correctIndex === 2
                              ? correctAnswer
                              : inCorrectAnswer
                          }
                          variant="outline-secondary"
                        >
                          {unescape(question.options[2])}{" "}
                        </Button>
                        <Button
                          disabled={question.isAnswered === "NO" ? false : true}
                          onClick={e => this.changeOptionFour(question)}
                          className={
                            question.isAnswered === "NO"
                              ? optionFourClass
                              : question.correctIndex === 3
                              ? correctAnswer
                              : inCorrectAnswer
                          }
                          variant="outline-secondary"
                        >
                          {unescape(question.options[3])}
                        </Button>
                      </div>
                    </div>
                    <br />

                    <div>
                      {this.state.buttonClassOne ||
                      this.state.buttonClassTwo ||
                      this.state.buttonClassThree ||
                      this.state.buttonClassFour ? (
                        <div>
                          {question.isAnswered === "CORRECT" ? (
                            <h3>Correct!</h3>
                          ) : (
                            <h3>Sorry!</h3>
                          )}
                        </div>
                      ) : (
                        <h3 className="white">Correct!</h3>
                      )}
                    </div>
                    <br />
                    <div>
                      <Button
                        onClick={e => this.changeNextQuestion(question)}
                        className="nextQuestion"
                        variant="outline-secondary"
                      >
                        Next Question
                      </Button>
                    </div>

                    <br />

                    <div>
                      <div>
                        <h6 className="score">
                          Score: {this.state.currentScore} %
                        </h6>
                        <h6 className="maxScore">
                          Max Score: {this.state.correctPredictedScore} %
                        </h6>
                      </div>

                      <ProgressBar className="progressBar">
                        <ProgressBar
                          style={{ backgroundColor: "#000000" }}
                          now={this.state.currentScore}
                        />
                        <ProgressBar
                          style={{ backgroundColor: "#6F6F6F" }}
                          now={this.state.inCorrectPredictedScore > this.state.currentScore ? this.state.inCorrectPredictedScore - this.state.currentScore : 0}
                        />
                        <ProgressBar
                          style={{ backgroundColor: "#D0D0D0" }}
                          now={this.state.correctPredictedScore > this.state.inCorrectPredictedScore ? this.state.correctPredictedScore - this.state.inCorrectPredictedScore : 0}
                        />
                        <ProgressBar
                          style={{ backgroundColor: "#FFFFFF" }}
                          now={100}
                        />
                      </ProgressBar>
                    </div>
                    <br />
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
