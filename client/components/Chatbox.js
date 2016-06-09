import React from 'react';


var socket = io();
var messages = [ {text:"msg1"}, {text:"msg2"} ];

var Title  = React.createClass({
    render: function() {
        return (
            <div className="title">
                <h1>{this.props.text}</h1>
            </div>
        );
    }
});

var Chatbox = React.createClass({
    getInitialState: function(){
        socket.on('init', this.initialize);
        socket.on('send:message', this.messageReceive);

        return { messages:[], text: ''};
    },

    initialize: function(data){
        this.setState({user: data.name});
    },

    messageReceive: function(message){
        this.state.messages.push(message);
        this.setState();
    },
    handleMessageSubmit : function(message){
        // this.state.messages.push(message);
        // this.setState();

        socket.emit('send:message', message);
    },
    render: function(){
        return(
          <div className='row'>
            <div className="chatbox col-md-3">
              <Title text="Chat Box"/>
              <MessageList messages={this.state.messages}/>
              <MessageForm submitfnc={this.handleMessageSubmit}/>
            </div>
          </div>
        );
    }
});

var MessageList = React.createClass({

    render: function () {
        var renderMessage = function(message){
            return <Message msg={message.text} />
        }
        return(
        <ul id="messages">
            { this.props.messages.map(renderMessage)}
        </ul>
        );
    }
});



var MessageForm = React.createClass({

    getInitialState: function(){
        return {text: ''};
    },
    changeHandler : function(e){
        this.setState({ text : e.target.value });
    },
    handleSubmit : function(e){
        e.preventDefault();
        var message = {
            text : this.state.text
        }

        this.props.submitfnc(message);
        this.setState({ text: '' });
    },
    render:function(){
        return(
          <div className="messageForm">
              <form onSubmit={this.handleSubmit} >
                  <input onChange={this.changeHandler} value={this.state.text}/>
                  <button>Submit</button>
              </form>
          </div>
        );
    }
});

var Message = React.createClass({
    render: function(){
        return(
            <li id="messages">{this.props.msg}</li>
        );
    }
});

export default Chatbox;