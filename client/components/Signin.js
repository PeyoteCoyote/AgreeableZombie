import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleSubmit() {
    var data = {
      value: 'Sign In Page'
    };
    $.ajax({
      url: 'http://localhost:8000',
      datatype: 'json',
      data: data,
      type: 'POST',
      success: (data) => {
        console.log('Data on Signin:', data);
      },
      error: (xhr, status, err) => {
        console.error('Error on Signin:', status, err);
      }
    });
  }

  render() {
    return (
      <div id="signup">
        <input type="text" name="email" placeholder="email"/>
        <input type="text" name="password" placeholder="password"/>
        <button onClick={this.handleSubmit}>Submit</button>
        <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active">not a user? <b>sign up</b></span>
      </div>
    );
  }
}

export default Signin;




