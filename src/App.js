import React, { Component } from 'react';
import CreateSurvey from './CreateSurvey';
import AnswerSurvey from './AnswerSurvey';
import DisplaySurveyResults from './DisplaySurveyResults';


class App extends Component {
  constructor(){
    super();
    this.state = {
      questionID : 0,
      displayCreateSurvey : false,
      questionCount : 0,
      surveyQuestions : [],
      initialState : true,
      surveyResponse : []
    }
    this.returnButtonMarkUp = this.returnButtonMarkUp.bind(this);

  }

  handleCreateSurvey() {
    this.setState({
      displayCreateSurvey : true,
      initialState : false,
      displayAnswerSurvey : false
    })
  }

  handleAnswerSurvey() {

    this.setState({
      displayAnswerSurvey : true,
      displayCreateSurvey : false,
      initialState : false
    })
  }

  handleShowSurveyResults() {
    this.setState({
      initialState : false,
      displaySurveyResults : true,
      displayAnswerSurvey : false,
      displayCreateSurvey : false
    })
  }

  refreshSurveyQuestions(questionArr){
    this.setState({
      surveyQuestions : questionArr,
      displayCreateSurvey : false,
      initialState : true
    })
  }

  submitSurveyQuestions(surveyResponse) {
    alert('survey response saved');
    debugger;
    this.setState({
      surveyResponse : surveyResponse,
      displayCreateSurvey : false,
      displayAnswerSurvey : false,
      initialState : true
    })
  }

  returnButtonMarkUp() {
    return(
      <div>
        <div className="col-md-4">
          <input type="button" className="btn btn-primary btn-lg" value="CREATE SURVEY" id="createSurvey" onClick={this.handleCreateSurvey.bind(this)}></input>
        </div>
        <div className="col-md-4">
          <input type="button" className="btn btn-primary btn-lg" value="ANSWER SURVEY" id="answerSurvey" onClick={this.handleAnswerSurvey.bind(this)}></input>
        </div>
        <div className="col-md-4">
          <input type="button" className="btn btn-primary btn-lg" value="SHOW SURVEY RESULTS" id="showSurvey" onClick={this.handleShowSurveyResults.bind(this)}></input>
        </div>
      </div>
    )
  }


  render() {

    if(this.state.initialState){
      return (
        <div className="App">
          <div className="App-header">
            <h2>e-Miles Survey Generator</h2>
          </div>
          <div className="row">
            {this.returnButtonMarkUp()}
          </div>

        </div>
      );
    }
    else {
      

      return (
        <div className="App">
          <div className="App-header">
            <h2>E-miles Survey Generator</h2>
          </div>
          <div className="row">
            <CreateSurvey display={this.state.displayCreateSurvey} refreshSurveyQuestions={this.refreshSurveyQuestions.bind(this)} />
          </div>
          <div className="row">
            <AnswerSurvey display={this.state.displayAnswerSurvey} questions={this.state.surveyQuestions} submitSurveyQuestions={this.submitSurveyQuestions.bind(this)} />
          </div>
          <div className="row">
            <DisplaySurveyResults display={this.state.displaySurveyResults} responses={this.state.surveyResponse} />
          </div>
        </div>
      );
    }

  }
}

export default App;
