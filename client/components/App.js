import React, { PropTypes, Component } from 'react';
import Library from './Library.js';
import Book from './Book.js';
import Logo from './Logo.js';
import Title from './Title.js';
import Background from './Background.js';
import PrevButton from './PrevButton.js';
import NextButton from './NextButton.js';
import LeftPageText from './LeftPageText.js';
import RightPageText from './RightPageText.js';
import LeftPageImage from './LeftPageImage.js';
import RightPageImage from './RightPageImage.js';
import WebCam from './WebCam.js';
import DrawingTools from './DrawingTools.js';
import socket from '../../websocket.js';
import $ from 'jquery';
import Wrapper from './Chatbox.js';
import SaveCanvas from './SaveCanvas.js';
import NotesCarousel from './NotesCarousel.js';
import Auth from '../services/auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomId: null
    };
  }

  componentWillMount() {
    var app = this;
    var pathway = window.location.pathname.split('/');
    var roomId = pathway[pathway.length - 1];
    this.setState({
      roomId: roomId
    });
  }

  componentDidMount() {
    this.render();
    var room = this.state.roomId;
    socket.emit('room', room);
  }

 onClickSnapshot() {
   var button = document.getElementById('btn-download');
   var data = document.getElementById('canvas').toDataURL('image/png');
   button.href = data;
   button.download = 'snapshot1.png';
   console.log(data);

   $.post('api/images', {time: Date.now(), img: data}, function(data, status) {
     console.log('>Data<<<<<<: ', data);
     console.log('>Status<<<<<<: ', status);
   });
 }

  changeText(event) {
    this.setState ({msg: event.msg});
  }

  render() {
     return (
          <div className = "container">
            <div className="webcam"><WebCam roomId={this.state.roomId} conversation={this.state.conversation}/></div>
            <div className="chatbox"><Wrapper roomId={this.state.roomId}/></div>
            <div className="drawingtools"><DrawingTools roomId={this.state.roomId} clickHandler={this.onClickSnapshot}/></div>
          </div>
        );
  }
}

export default App;
