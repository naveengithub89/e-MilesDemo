import React, { Component } from 'react';
import RenderIndividualResponse from './RenderIndividualResponse';

class DisplaySurveyResults extends Component {




  render() {
    return(
      <div>
        {this.props.responses.map(function(resp){
          return (
            <RenderIndividualResponse key={resp.questionID} resp={resp} />
          )
        })}
      </div>
    )
  }
}

export default DisplaySurveyResults;
