import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

class Signup extends Component {
	constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      email: ''
    };
	}

	handleSubmit() {
    var data = {
      value: 'Sign Up Page'
    };
    $.ajax({
      url: 'http://localhost:8000/signup',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: (data) => {
        console.log('DATA in Signup Page: ', data);
        // this.setState({

        // });
      },
      error: (xhr, status, err) => {
        console.error('Error passing to server', status, err.toString());
      }
    });
	}

	render() {
		return (
      <div id="signup">
        <input type="text" name="firstname" placeholder="first name"/>
        <input type="text" name="lastname" placeholder="last name"/>
        <input type="text" name="password" placeholder="password"/>
        <input type="text" name="passwordConfirm" placeholder="confirm password"/>
        <input type="text" name="email" placeholder="email"/>
        <button onClick={this.handleSubmit}>Submit</button>
         <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active">already have an account ? <b>sign in</b></span>
      </div>
		);
	}
}

export default Signup;