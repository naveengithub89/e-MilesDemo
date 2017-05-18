import React, { Component } from 'react';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsAdded : false,
      dropDownQTypeValue : 'Radio Button',
      questionValue : '',
      options : [],
      textVal : ''
    }
  }

  handleOptionAdd() {
    let optionsTemp = this.state.options;
    let textVal = this.state.textVal;
    let questionValue = this.state.questionValue;
    let dropDownQTypeValue = this.state.dropDownQTypeValue;
    optionsTemp.push(textVal);
    this.setState({
      options : optionsTemp,
      textVal : '',
      createQuestion : true,
      questionValue : questionValue,
      dropDownQTypeValue : dropDownQTypeValue,
      optionsAdded : true
    });

  }


  handleOptionValChange(e) {
    this.setState({
      textVal : e.target.value
    })
  }

  returnOptionsMarkUp(){
    if(this.state.dropDownQTypeValue === 'Text Box'){
      return(
        <div className="form-group">
            <div className="col-lg-10 col-lg-offset-2">
              <input type="button" className="btn btn-primary" value="CREATE QUESTION" onClick={this.handleQuestionCreation.bind(this)}></input>
              <input type="button" className="btn btn-default" value="CANCEL" onClick={this.handleCancelClick.bind(this)}></input>
            </div>
        </div>
      )
    }
    else{
      return(

        <div>
          <div className="form-group">
            <label id="questionTypeLabel" htmlFor="select" className="col-lg-2 control-label">Options : </label>
            <div className="col-lg-9">
              <input id="optionTextBox" type="text" value={this.state.textVal} onChange={this.handleOptionValChange.bind(this)}></input>
            </div>
            <div className="col-lg-1">
              <button id="addOption" className="fa fa-plus fa-2x" aria-hidden="true" onClick={this.handleOptionAdd.bind(this)}></button>
            </div>
          </div>
        </div>
      )
    }
  }
  handledropdownChange(e) {
    let value = e.target.value;
    this.setState({
      dropDownQTypeValue : value
    })
  }

  handleQuestionValue(e) {
    let questionVal = e.target.value;
    this.setState({
      questionValue : questionVal
    })
  }

  returnOptionsMarkUpForDisplay() {
    let options = this.state.options;
    const createItem = function (item, key) {
        return <option key={key} value={item} >{item}</option>;
    };
    if(this.state.optionsAdded){
      return(
        <div className="form-group">
          <label id="questionTypeLabel" htmlFor="select" className="col-lg-2 control-label">Options Display : </label>
          <div className="col-lg-10">
            <select multiple="" className="form-control" size="5">
              {options.map(createItem)}
            </select>
          </div>
        </div>
      )
    }
  }

  handleCancelClick() {
    this.props.cancelClick();
  }

  handleQuestionCreation() {
    let questionID = Number(this.props.questionID);
    let question = {};
    question.questionID = questionID;
    question.question = this.state.questionValue;
    question.questionType = this.state.dropDownQTypeValue;
    question.options = this.state.options;
    this.props.AddQuestion(question);
    this.setState({
      questionID : questionID
    })
  }

  render() {
    if(!this.state.optionsAdded) {
      return(
        <div className="col-lg-8">
          <div className="well bs-component">
              <fieldset>
                <legend>Create Question</legend>
                <div className="form-group">
                  <label id="questionLabel" htmlFor="textArea" className="col-lg-2 control-label">Question : </label>
                  <div className="col-lg-10">
                    <textarea className="form-control" rows="3" id="textArea" onChange={this.handleQuestionValue.bind(this)}></textarea>
                  </div>
                </div>


                <div className="form-group">
                  <label id="questionTypeLabel" htmlFor="select" className="col-lg-2 control-label">Question Type : </label>
                  <div className="col-lg-10">
                    <select className="form-control" id="select" onChange={this.handledropdownChange.bind(this)}>
                      <option>Radio Button</option>
                      <option>Check Box</option>
                      <option>Drop Down</option>
                      <option>Text Box</option>
                    </select>
                  </div>
                </div>


                {this.returnOptionsMarkUp()}
              </fieldset>

          </div>
        </div>
      )
    }
    else {
      return(
        <div className="col-lg-8">
          <div className="well bs-component">

              <fieldset>
              <legend>Create Question</legend>
              <div className="form-group">
                <label id="questionLabel" htmlFor="textArea" className="col-lg-2 control-label">Question : </label>
                <div className="col-lg-10">
                  <textarea className="form-control" rows="3" id="textArea" onChange={this.handleQuestionValue.bind(this)}></textarea>
                </div>
              </div>

              <div className="form-group">
                <label id="questionTypeLabel" htmlFor="select" className="col-lg-2 control-label">Question Type : </label>
                <div className="col-lg-10">
                  <select className="form-control" id="select" onChange={this.handledropdownChange.bind(this)}>
                    <option>Radio Button</option>
                    <option>Check Box</option>
                    <option>Drop Down</option>
                    <option>Text Box</option>
                  </select>
                </div>
              </div>

              {this.returnOptionsMarkUp()}

              {this.returnOptionsMarkUpForDisplay()}

              <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <input type="button" className="btn btn-primary" value="CREATE QUESTION" onClick={this.handleQuestionCreation.bind(this)}></input>
                    <input type="button" className="btn btn-default" value="CANCEL" onClick={this.handleCancelClick.bind(this)}></input>
                  </div>
              </div>

            </fieldset>

          </div>
        </div>
      )

    }
  }
}

export default AddQuestion;
