import React, { Component } from 'react';
import AnswerQuestion from './AnswerQuestion';
var _ = require('lodash');

class AnswerSurvey extends Component {

  constructor(props) {
    super(props);
    this.state = {
      surveyResponse : []
    }
    this.saveSurveyResponse = this.saveSurveyResponse.bind(this);
  }

  saveSurveyResponse(resp){
    this.setState({
      surveyResponse : resp
    })
  }

  handleSubmitSurveyClick() {

    let surveyResponse = this.state.surveyResponse;
    let answeredQuestions = surveyResponse.filter(function(obj){return obj.isAnswered===true;});
    let unansweredQuestions = surveyResponse.filter(function(obj){return obj.isAnswered!=true;});

    if(this.props.questions.length!=answeredQuestions.length) {

      let answeredQuestionIDs = answeredQuestions.map(function(obj){
        return obj.questionID;
      });

      let surveyQuestionIDs = this.props.questions.map(function(question){
        return question.questionID;
      });
      let unansweredIDs = _.difference(surveyQuestionIDs,answeredQuestionIDs);
      debugger;
      let alertMsg = unansweredIDs.join(',');

      alert('You have not saved the following questions '+alertMsg);
    }
    else {
      this.props.submitSurveyQuestions(surveyResponse);
    }

  }

  returnAnswerSurveyMarkUp() {
    
    let saveSurveyResponse = this.saveSurveyResponse.bind(this);
    let surveyResponse = this.state.surveyResponse;

    return(
      <div className="col-lg-8">
        <div className="well bs-component">

            {this.props.questions.map(function(question){
              let q = question;
                return (<AnswerQuestion key={q.questionID} question={question} modifiedAnswerArray={surveyResponse} saveSurveyResponse={saveSurveyResponse} />)
            })}
            <div>
              <input type="button" id="submitSurvey" className="btn btn-primary btn-lg" value="SUBMIT SURVEY" onClick={this.handleSubmitSurveyClick.bind(this)}></input>
            </div>

        </div>
      </div>
    )
  }

  render(){

    if(this.props.display){

      return(
        <div className="col-md-12">
           {this.returnAnswerSurveyMarkUp()}
        </div>
      )
    }
    else {

      return(
        <div></div>
      )
    }
  }
}

export default AnswerSurvey;
