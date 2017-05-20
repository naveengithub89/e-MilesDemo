import React, { Component } from 'react';
import RenderRadioButton from './RenderRadioButton';
import RenderCheckBoxes from './RenderCheckBoxes';
import RenderDropDown from './RenderDropDown';
import RenderAppropriateElement from './RenderAppropriateElement';
var _ = require('lodash');


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

    let modifiedAnswerArray = this.state.modifiedAnswerArray;
    this.props.saveSurveyResponse(modifiedAnswerArray);
  }




  captureVal(questionModified) {

    let modifiedAnswerArray = this.props.modifiedAnswerArray!=undefined?this.props.modifiedAnswerArray:[];
    let newArray = [];
    newArray.push(questionModified);
    let element = modifiedAnswerArray.filter(obj=>obj.questionID === questionModified.questionID);
    if(element.length > 0){
       modifiedAnswerArray = modifiedAnswerArray.filter(obj => obj.questionID!=questionModified.questionID);
       modifiedAnswerArray.push(questionModified);
    }
    else {
      modifiedAnswerArray.push(questionModified);
    }
    this.setState({
      modifiedAnswerArray : modifiedAnswerArray
    });

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
                  <RenderAppropriateElement question={this.props.question} captureVal={this.captureVal.bind(this)} />
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
