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
    var app = this;
    $.getJSON('/api/books', function(data) {

      console.log('data from server is - ', data);

      var title = data[0].bookTitle;
      var bookData = data[0].bookData;

      console.log('bookTitle is - ', title);
      console.log('bookdata is - ', bookData);

      app.setState({
        bookTitle: title,
        bookData: bookData
      });
    });
  }

  componentDidMount() {
    this.render();
  }

  onClickPrev() {
    console.log('Previous Clicked');
    socket.emit('PrevButtonClick', {msg: 'Previous button clicked', pageCounter: this.state.pageCounter-2});
    if(this.state.pageCounter-1>=0) {
      this.setState({pageCounter: this.state.pageCounter-2});
    } else {
      socket.emit('PrevButtonClick', {msg: "BEGINNING OF BOOK!", pageCounter: this.state.pageCounter});
    }
  }

  onClickNext() {
    console.log('Next clicked');
    if (this.state.pageCounter<this.state.bookData.length-1) {
      this.setState({pageCounter: this.state.pageCounter+2});
      socket.emit('NextButtonClick', {msg: 'Next button clicked', pageCounter: this.state.pageCounter+2});
    } else {
      socket.emit('NextButtonClick', {msg: "END OF BOOK!", pageCounter: this.state.pageCounter});
    }
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
    if (this.state.bookData.length > 0) {
     return (
          <div>
            <div id="webcam-features">
              <WebCam conversation={this.state.conversation}/>
            </div>
            <div id='buttons-with-book'>
              <div id='center'><Background />
              <Chatbox />
              <NotesCarousel />
              <div id='left-button'><SaveCanvas clickHandler={this.onClickSnapshot}/></div>              
              </div>
            </div>
            <DrawingTools />
          </div>
        );
  } else {
    return(<p> Loading ... </p>);
  }
}
};

export default App;
