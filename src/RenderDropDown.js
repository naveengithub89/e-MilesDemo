import React, { Component } from 'react';

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
    this.props.captureValue(dropdownValue);
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

export default RenderDropDown;
