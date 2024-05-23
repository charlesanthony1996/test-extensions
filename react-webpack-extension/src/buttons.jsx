import React from 'react';
import ReactDOM from 'react-dom';

const Buttons = () => (
  <div>
    <button id="btn1">Button 1</button>
    <button id="btn2">Button 2</button>
  </div>
);

export default Buttons;

// Render the buttons to a specific element in the DOM
const mountNode = document.getElementById('button-container');
if (mountNode) {
  ReactDOM.render(<Buttons />, mountNode);
}
