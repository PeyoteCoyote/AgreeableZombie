import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      email: '',
      password:'',
      error: false,
      errorMessage: ''
    };
  }
  handleEmail (event) {
    this.setState({email: event.target.value});
  }
  handlePassword (event) {
    this.setState({password: event.target.value});
  }
  handleSubmit() {
    // -------------- validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (this.state.email === '' || !re.test(this.state.email)) {
      console.log('INVALID EMAIL');
      this.setState({
        error: true,
        errorMessage: 'invalid email'
      });
    }
    if (this.state.password === '') {
      console.log('INVALID PASSWORD');
      this.setState({
        error: true,
        errorMessage: 'invalid password'
      });
    }

    // -------------- end validation

    // check if all fields are valid before sending off the request
    if(this.state.email !== '' && re.test(this.state.email) && this.state.password !== ''){
      var data = {
        value: 'Sign In Page'
      };
      $.ajax({
        url: 'http://localhost:8000/signin',
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
  }

  render() {
    return (
      <div id="signup">
        <input type="text"
               name="email"
               placeholder="email"
               onChange = {this.handleEmail.bind(this)}
               value = {this.state.email} />
        <input type="text"
               name="password"
               placeholder="password"
               onChange = {this.handlePassword.bind(this)}
               value = {this.state.password} />
             <Link to="/dashboard" onClick={this.handleSubmit.bind(this)}>Submit</Link>
        <span className="signup-link" onClick={()=>this.props.fn()} activeClassName="active">not a user? <b>sign up</b></span>
      </div>
    );
  }
}

export default Signin;
