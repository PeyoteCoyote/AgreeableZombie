import React, { PropTypes, Component } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Landing from './Landing';
import Auth from '../services/auth';
import { Link, browserHistory } from 'react-router';

class LandingLayout extends Component{
  constructor(props){
    super(props)
    this.state = {
      signup : false
    }
  }
  openSignup(signup){
    console.log('This is state:', this.state.signup, 'setting it to:', signup);
    this.setState({signup : signup});
  }
  handleClick(){
    console.log('I am being clicked');
    this.openSignup(!this.state.signup);
  }

  render() {
    var sidebar = this.state.signup ? <Signup fn={this.handleClick.bind(this)} /> : <Signin fn={this.handleClick.bind(this)} />;
    return (
      <div className="Landing">
          <Landing />
        <div className="primary-aside">
          {sidebar}
        </div>
      </div>
    );
  }

  componentWillMount() {
    if(window.localStorage.getItem('com.classly')) {
      Auth.signedin({token: window.localStorage.getItem('com.classly'), email: window.localStorage.getItem('email')}, function(result) {
        console.log('Result from componentWillMount dash', result);
        const path = window.localStorage.getItem('id')+ '/dashboard';
        browserHistory.push(path);        
      });
    } else {    
      browserHistory.push('/');    
    }
  }  


};

export default LandingLayout;
