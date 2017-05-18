import React, { Component } from 'react';

class RenderIndividualResponse extends Component {



  renderResponse() {
    if(this.props.resp.questionType === 'Text Box') {
      return(
        <div className="floatLeftClass">{this.props.resp.textAnswer}</div>
      )
    }

    else if(this.props.resp.questionType === 'Radio Button') {
      return(
        <div className="floatLeftClass">{this.props.resp.radioAnswer}</div>
      )
    }

    else if(this.props.resp.questionType === 'Drop Down') {
      return(
        <div className="floatLeftClass">{this.props.resp.dropdownVal}</div>
      )
    }
    else if(this.props.resp.questionType === 'Check Box') {
      let outString = this.props.resp.checkBoxAnswer.join(',');
      return(
        <div>{outString}</div>
      )
    }
  }


  render() {
    return(

      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-md-1">
              {this.props.resp.questionID}
            </div>
            <div id="alignmentLeft" className="col-md-8">
                Question : {this.props.resp.question}
            </div>
          </div>
          <div className="row">
            <div className="col-md-1">A.</div>
            <div className="col-md-8">
              {this.renderResponse()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RenderIndividualResponse;
