import React, { PropTypes, Component } from 'react';

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
        <button onClick={this.handleSubmit().bind(this)}>Submit</button>
      </div>
		);
	}
}

export default Signup;