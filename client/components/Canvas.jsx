import React from 'react';
import ReactDOM from 'react-dom';


class Canvas extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      // mouse state
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev:false,

      //canvas state
      canvas: null,
      context: null,
      width: window.innerWidth,
      height: window.innerHeight,
      socket: socket,
    };

    socket.on('drawLine', data => {
      var line = data.line;
      var context = this.state.context;
      context.beginPath();
      context.lineWidth = 2;
      context.moveTo(line[0].x - 500 , line[0].y - 150 ); // adjusts draw point to be in book component
      context.lineTo(line[1].x - 500 , line[1].y - 150 );
      context.strokeStyle = this.props.color;
      context.stroke();
      console.log("CONTEXT", this.state.context, "CANVAS", this.state.canvas);
    });

    socket.on('clearCanvas', data => {
      var context = this.state.context;
      context.clearRect(0, 0, canvas.width, canvas.height);

    });
  }

  componentDidMount() {
    var canvas = this.refs.canvas;
    var context = canvas.getContext('2d');
    canvas.width = document.getElementsByClassName('whiteboard')[0].clientWidth;
    canvas.height = document.getElementsByClassName('whiteboard')[0].clientHeight;

    canvas.onmousedown = e => {
      this.setState({click:true});
    };

    canvas.onmouseup = e => {
      this.setState({click:false});
    };

    var boundingRect = document.getElementsByClassName('whiteboard')[0].getBoundingClientRect();

    canvas.onmousemove = e => {
      var mx = e.clientX + 239;
      var my = e.clientY + 70;
      console.log("MOUSE",mx, my);
      this.setState({
        move: true,
        pos: {x:mx, y:my}
      });
    };

    this.setState({
      canvas: canvas,
      context: context
    });

    this.drawLoop();
  }

  drawLoop() {
    if(this.state.click && this.state.move && this.state.pos_prev) {
      socket.emit('drawLine', {line: [this.state.pos, this.state.pos_prev]});
      this.setState({move: false});
    }
    this.setState({pos_prev: this.state.pos});
    setTimeout(this.drawLoop.bind(this), 25);
  }

  render() {
    return (
      <div className="canvas-container">
        <canvas id="canvas" ref="canvas" className="whiteboard"></canvas>
      </div>
    );
  }
}

export default Canvas;
