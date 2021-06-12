import React from 'react';
import Slider from '@material-ui/core/Slider';


class SliderComponent extends React.Component {
  render() {
    return (
        <div>
        <Slider
        defaultValue={50}
        valueLabelDisplay="on"
         />
        </div>
      );
  }
}

export default SliderComponent;
// To use this function: ReactDOM.render(<SliderComponent />, document.getElementById('root')); 
//(at least to see it indepent) -->/