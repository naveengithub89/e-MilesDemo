import React, { Component } from 'react';
import RenderRadioButton from './RenderRadioButton';
import RenderCheckBoxes from './RenderCheckBoxes';
import RenderDropDown from './RenderDropDown';

class AnswerQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      textAnswer : '',
      radioAnswer : this.props.question.options[0],
      checkBoxAnswer : [false, false, false],
      modifiedAnswerArray : [],
      dropdownVal : this.props.question.options[0]
    }

  }


  handleTextBoxAnswerChange(e) {
    let textBoxAnswer = e.target.value;
    this.setState({
      textAnswer : textBoxAnswer
    });
  }

  captureRadioVal(i) {
    let radioAnswer = this.props.question.options[i];
    this.setState({
      radioAnswer : radioAnswer
    })
  }

  captureCheckBoxVal(options) {
    let checkBoxAnswer = options;
    this.setState({
      checkBoxAnswer : options
    })
  }

  captureDropDownVal(dropdownval) {
    let dropdownVal = dropdownval;
    this.setState({
      dropdownVal : dropdownVal
    })
  }

  handleSaveAnswerClick() {
    let qType = this.props.question.questionType;
    let modifiedAnswerArray = this.props.modifiedAnswerArray!=undefined?this.props.modifiedAnswerArray:[];
    

    if(qType=== 'Text Box'){
      var questionModified = {};
      questionModified.question = this.props.question.question;
      questionModified.questionID = this.props.question.questionID;
      questionModified.questionType = this.props.question.questionType;
      questionModified.isAnswered = true;
      questionModified.textAnswer = this.state.textAnswer;

      modifiedAnswerArray.push(questionModified);

      this.setState({
        modifiedAnswerArray : modifiedAnswerArray
      })
    }

    if(qType === 'Radio Button') {
      var questionModified = {};
      questionModified.question = this.props.question.question;
      questionModified.options = this.props.question.options;
      questionModified.questionID = this.props.question.questionID;
      questionModified.questionType = this.props.question.questionType;
      questionModified.isAnswered = true;
      questionModified.radioAnswer = this.state.radioAnswer;

      modifiedAnswerArray.push(questionModified);
      this.setState({
        modifiedAnswerArray : modifiedAnswerArray
      })
    }

    if(qType === 'Check Box') {
      var questionModified = {};
      questionModified.question = this.props.question.question;

      questionModified.questionID = this.props.question.questionID;
      questionModified.questionType = this.props.question.questionType;
      questionModified.isAnswered = true;
      questionModified.checkBoxAnswer = this.state.checkBoxAnswer;

      modifiedAnswerArray.push(questionModified);
      this.setState({
        modifiedAnswerArray : modifiedAnswerArray
      })
    }

    if(qType === 'Drop Down') {
      var questionModified = {};
      questionModified.question = this.props.question.question;
      questionModified.questionID = this.props.question.questionID;
      questionModified.questionType = this.props.question.questionType;
      questionModified.isAnswered = true;
      questionModified.dropdownVal = this.state.dropdownVal;

      modifiedAnswerArray.push(questionModified);
      this.setState({
        modifiedAnswerArray : modifiedAnswerArray
      })
    }

    this.props.saveSurveyResponse(modifiedAnswerArray);
  }


  renderAppropriateElement() {

    if(this.props.question.questionType === 'Text Box') {
      return(
          <div>

            <textarea value={this.state.textAnswer} className="form-control" rows="2" onChange={this.handleTextBoxAnswerChange.bind(this)}></textarea>
          </div>
      )
    }
    else if(this.props.question.questionType === 'Radio Button') {
      let options = this.props.question.options;
      return(
            <RenderRadioButton options = {options} captureVal={this.captureRadioVal.bind(this)} />
      )
    }
    else if(this.props.question.questionType === 'Check Box') {
      let options = this.props.question.options;
      return(
            <RenderCheckBoxes options = {options} captureValue={this.captureCheckBoxVal.bind(this)} />
      )
    }

    else if(this.props.question.questionType === 'Drop Down') {
      let options = this.props.question.options;
      return(
            <RenderDropDown options = {options} captureValue={this.captureDropDownVal.bind(this)} />
      )
    }
  }
  render() {
    return(

          <div>
            <div className="row">
              <div className="col-lg-1">
                <label id="questionLabel" htmlFor="textArea" className="col-lg-2 control-label">{this.props.question.questionID}</label>
              </div>
              <div className="col-lg-6">
                <textarea value={this.props.question.question} className="form-control" rows="3" id="textArea" readOnly></textarea>
              </div>
            </div>
            <div className="row"><br></br></div>
            <div className="row">
            <div className="col-lg-1"></div>
              <div className="col-lg-6">
                {this.renderAppropriateElement()}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-1"></div>
              <div className="col-lg-6">
                <input type="button" id="saveAnswerButton" className="btn btn-primary" value="SAVE ANSWER" onClick={this.handleSaveAnswerClick.bind(this)}></input>
              </div>
            </div>
          </div>
        )
  }
}

export default AnswerQuestion;
