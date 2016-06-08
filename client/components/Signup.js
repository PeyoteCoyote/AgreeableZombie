import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Signup extends Component {
	constructor(props) {
    super(props);

    this.state = {
      
    };
	}

	handleSubmit() {
    
	}

	render() {
		return (
      <div id="signup">
        <input type="text" name="firstname" placeholder="first name"/>
        <input type="text" name="lastname" placeholder="last name"/>
        <input type="text" name="password" placeholder="password"/>
        <input type="text" name="passwordConfirm" placeholder="confirm password"/>
        <input type="text" name="email" placeholder="email"/>
        <button>Submit</button>
         <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active">already have an account ? <b>sign in</b></span>
      </div>
		);
	}
}

export default Signup;