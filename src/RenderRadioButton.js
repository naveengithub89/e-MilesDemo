import React, { Component } from 'react';

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
     this.props.captureVal(i);
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

export default RenderRadioButton;
