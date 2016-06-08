import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App.js';
import Router from './router';

// Check if browser has WebRTC, WebRTC is required for webcam/Twilio to work
if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
    alert('WebRTC is not available in your browser.');
}

var render = function() {
  ReactDOM.render(
    // <App/>
    Router,
    document.getElementById('app')
  );
};

render();