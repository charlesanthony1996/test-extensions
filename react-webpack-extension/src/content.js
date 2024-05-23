import React from 'react';
import ReactDOM from 'react-dom';
import Buttons from './buttons.jsx';
import "./test.js"

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  let mountNode = document.getElementById('button-container');
  if (!mountNode) {
    mountNode = document.createElement('div');
    mountNode.id = 'button-container';
    document.body.appendChild(mountNode);
  }

  ReactDOM.render(<Buttons />, mountNode);
});
