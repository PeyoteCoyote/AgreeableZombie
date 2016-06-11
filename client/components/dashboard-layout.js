import React, { PropTypes, Component } from 'react';
import StartClass from './StartClass';
import Auth from '../services/auth';
import { Link, browserHistory } from 'react-router';

class DashboardLayout extends Component {
  constructor(props){
    super(props);
    this.state = {
      signup : false
    };
  }

  render() {
    return (
      <div className="Dashboard">
        <StartClass room='A'/>
        <StartClass room='B'/>
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

export default DashboardLayout;
