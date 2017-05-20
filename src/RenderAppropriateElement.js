import React, {Component} from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';


class RenderTextBox extends Component {

  constructor(props){
    super();
    this.state = {
      textAnswer : ''
    }
  }
  handleTextBoxAnswerChange(e){
    let textBoxAnswer = e.target.value;
    if(textBoxAnswer.trim() === ''){
      alert('Please enter a valid value in the text box');
    }
    else{
      this.setState({
        textAnswer : textBoxAnswer
      });
      this.props.captureVal('textAnswer',textBoxAnswer);
    }
  }

  render(){

    return(
        <div>
          <textarea value={this.state.textAnswer} className="form-control" rows="2" onChange={this.handleTextBoxAnswerChange.bind(this)}></textarea>
        </div>
    )
  }
}



class RenderCheckBoxes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options : []
    }
  }

  optionsChanged(newOptions) {

    this.setState({
      options: newOptions
    });
    this.props.captureVal('checkBoxAnswer',newOptions);
  }

  render(){

    const createItem = function (item, key) {
        return (<label className="floatAlignmentLeft" key={key}><Checkbox className="checkBoxClass" key={key} value={item} />{item}</label>);
    };
    return(
        <div>
          <CheckboxGroup
            name="options"
            value={this.state.options}
            onChange={this.optionsChanged.bind(this)}>
            {this.props.options.map(createItem)}
          </CheckboxGroup>
        </div>
    );
  }
}



class RenderDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownVal : this.props.options[0]
    }
  }

  handleChange(e){
    let dropdownValue = e.target.value;
    this.setState({
        dropDownVal: e.target.value
    });
    this.props.captureVal('dropdownVal',dropdownValue);
  }

  render() {

    var createItem = function (item, key) {
        return <option key={key} value={item} >{item}</option>;
      };

    return(
      <div>
        <select id="dropdownWidth" onChange={this.handleChange.bind(this)} value={this.state.dropDownVal} >
                {this.props.options.map(createItem)}
        </select>
      </div>
    )
  }

}


class RenderRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked : 0
    }
  }

  onChange(i){
     this.setState({
         checked: i
     });
     let radioAnswerChosen = this.props.options[i];
     this.props.captureVal('radioAnswer',radioAnswerChosen);
  }

  render() {
    return(
        <div>
            {
                this.props.options.map((option,i)=>{
                    return <label className="floatAlignmentLeft" key={i}>
                                <input
                                    type="radio"
                                    checked={this.state.checked == i ? true : false}
                                    key={i+100}
                                    onChange={this.onChange.bind(this,i)}
                                    value={i} />
                                {option}
                            </label>
                })
            }
        </div>
    );
  }
}

const map = {
  RadioButton : RenderRadioButton,
  TextBox : RenderTextBox,
  CheckBox : RenderCheckBoxes,
  DropDown : RenderDropDown
};


class RenderAppropriateElement extends Component {

  returnQType(qtype){
    return qtype.replace(' ','');
  }

  captureVal(fieldName,Value){
    var questionModified = {};
    questionModified.question = this.props.question.question;
    questionModified.questionID = this.props.question.questionID;
    questionModified.questionType = this.props.question.questionType;
    questionModified.options = this.props.question.options!=undefined?this.props.question.options:[];
    questionModified.isAnswered = true;
    questionModified[fieldName] = Value;
    this.props.captureVal(questionModified);
  }

  returnElement() {
    let requiredQType = this.returnQType(this.props.question.questionType);
    let options = this.props.question.options!=undefined?this.props.question.options:[];
    let captureVal = this.captureVal.bind(this);
    let props = {options : options, captureVal : captureVal};
    return(
      React.createElement(map[requiredQType],props)
    )
  }

  render() {

    return(
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-6">
            <div>
              {this.returnElement()}
            </div>
          </div>
        </div>
    )
  }
}




export default RenderAppropriateElement;
