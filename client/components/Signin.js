import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  // handleSubmit() {
  
  // }

  render() {
    return (
      <div id="signup">
        <input type="text" name="email" placeholder="email"/>
        <input type="text" name="password" placeholder="password"/>
        <button >Submit</button>
        <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active">not a user? <b>sign up</b></span>
      </div>
    );
  }
}

export default Signin;




