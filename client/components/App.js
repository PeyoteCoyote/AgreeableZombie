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
import Chatbox from './Chatbox.js';
import SaveCanvas from './SaveCanvas.js';
import NotesCarousel from './NotesCarousel.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCounter: 0,
      bookTitle: '',
      bookData: [],
      author: 'Eric Carle'
    };

    socket.on('prev page', (data) => {
      console.log ('data from server', data);
      this.setState({msg: data.msg});
      this.setState({pageCounter: data.pageCounter});
    });

    socket.on('next page', (data) => {
      this.setState({msg: data.msg});
      this.setState({pageCounter: data.pageCounter});
    });
  }

  componentWillMount() {

  }

  componentDidMount() {
    this.render();
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
          <div>
            <div id="webcam-features">
              <WebCam conversation={this.state.conversation}/>
            </div>
            <div id='buttons-with-book'>
              <div id='center'><Background />
              <Chatbox />
              <NotesCarousel />
              <DrawingBoard />
              <div id='left-button'><SaveCanvas clickHandler={this.onClickSnapshot}/></div>              
              </div>
            </div>
            <DrawingTools />
          </div>
        );
  } 
}

export default App;
