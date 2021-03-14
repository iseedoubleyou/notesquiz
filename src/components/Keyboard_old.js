import React from 'react';
// import ReactDOM from 'react-dom';
import '../index.css';
import { Instrument } from 'piano-chart';

const keyboard_wic  = new Instrument(document.getElementById('pianoContainer'), {
  startOctave: 4,
  endOctave: 5,
  }
);


class Klavier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

   render() {
    let titel = 'Klaviatur'
    
    keyboard_wic.create();
    keyboard_wic.keyDown("D4");
    
    return (

      <div>
        <div className="titel">{titel}</div>
        <div className="klavier">{this.keyboard_wic}</div>
      </div>
    ); 
  }
}



/*
  => {
  return (
    <div>
      <Keyboard
        startKey={21}
        endKey={108}
      />
    </div>
  )
}
*/

export default Klavier;