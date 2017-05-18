import React, { Component } from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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
    this.props.captureValue(newOptions);
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

export default RenderCheckBoxes;
