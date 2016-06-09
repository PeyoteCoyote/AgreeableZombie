import React, { PropTypes, Component } from 'react';
import { Link, browserHistory } from 'react-router';
import auth from './../services/auth';

class Signup extends Component {
	constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
      email: '',
			error: false,
			errorMessage: ''
    };
	}

	handleSubmit() {
		// validation
		console.log('i was hit');
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log('checking password');
		//check if the passwords entered matches
    if (this.state.password !== this.state.passwordConfirm) {
			console.log('PASSWORDS DO NOT MATCH');
      this.setState({error: true, errorMessage: 'passwords do not match'});
    }
    console.log('checking email');
    //check if the email supplied is valid
    if (!re.test(this.state.email)) {
      this.setState({error: true, errorMessage: 'invalid email'});
    }
    
	  console.log('getting ready to send to server:', this.state);
		// if everything passes, then do the ajax request
		  if (this.state.firstName !== '' && this.state.lastName !== ''){
		  	console.log('setting up data:');
				var data = {
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					password: this.state.password,
					email: this.state.email
				};
				console.log('sending to server');
				auth.signup(data, (resDB)=>{
					console.log('signed up', resDB);
					browserHistory.push('/dashboard');

				})
			}
	}

	render() {
		return (
      <div id="signup">
        <input type="text"
					name="firstname"
					placeholder="first name"
					value = {this.state.firstName}
					onChange ={(event) => this.setState({firstName: event.target.value})}/>
        <input type="text"
					name="lastname"
					placeholder="last name"
					value = {this.state.lastName}
					onChange ={(event) => this.setState({lastName: event.target.value})}/>
        <input type="text"
					name="password"
					placeholder="password"
					value = {this.state.password}
					onChange ={(event) => this.setState({password: event.target.value})}/>
        <input type="text"
					name="passwordConfirm"
					placeholder="confirm password"
					value = {this.state.passwordConfirm}
					onChange ={(event) => this.setState({passwordConfirm: event.target.value})}/>
        <input type="text"
					name="email"
					placeholder="email"
					value = {this.state.email}
					onChange ={(event) => this.setState({email: event.target.value})}/>
				<button onClick={this.handleSubmit.bind(this)}>Submit</button>
         <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active">already have an account ? <b>sign in</b></span>
      </div>
		);
	}
}

export default Signup;
