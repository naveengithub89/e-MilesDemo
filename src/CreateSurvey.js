import React, { Component } from 'react';
import AddQuestion from './AddQuestion';

class CreateSurvey extends Component {
  constructor(props){
    super(props);
    this.state = {
      createQuestion : false,
      display : this.props.display,
      questionArr : []
    }
    this.returnCreateSurveyMarkUp = this.returnCreateSurveyMarkUp.bind(this);
  }

  handleCreateQuestionClick() {
    this.setState({
      createQuestion : true
    })
  }
  cancelClick() {
    this.setState({
      createQuestion : false
    })
  }

  AddQuestion(questionObj) {
    let questionArr = this.state.questionArr;
    questionArr.push(questionObj);
    this.setState({
      createQuestion : false,
      questionArr : questionArr
    })
  }

  handleEndSurveyClick(){
    let questions = this.state.questionArr;
    this.props.refreshSurveyQuestions(questions);
  }

  returnCreateSurveyMarkUp(){

    if(this.state.createQuestion === false){
      return(
        <div id="createQuestionDiv">
          <br />
          <input id="createQuestion" type="button" className="btn btn-primary" value="CREATE QUESTION" onClick={this.handleCreateQuestionClick.bind(this)}></input>

          <input type="button" className="btn btn-primary" value="END SURVEY" onClick={this.handleEndSurveyClick.bind(this)}></input>

        </div>
      )
    }
    else{
        let questionID = this.state.questionArr.length + 1;
        return(
          <AddQuestion cancelClick={this.cancelClick.bind(this)} AddQuestion={this.AddQuestion.bind(this)} questionID = {questionID} />
        )
    }
  }

  render() {

    if(this.props.display){

      return(
        <div className="col-md-12">
           {this.returnCreateSurveyMarkUp()}
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

export default CreateSurvey;
