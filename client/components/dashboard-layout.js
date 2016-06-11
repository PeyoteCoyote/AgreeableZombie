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

      <div className="container dashboardcontainer">
        <h1> Welcome Esther, </h1>
        <h2> Live as if you were to die tomorrow. Learn as if you were to live forever.</h2>
        <h2> This is your Dashboard. Choose which classroom you wish to join. </h2>
        <div className="startclasscontainer">
          <div className="aclass">
            <StartClass room='A'/>
          </div>
          <div className ="bclass">
            <StartClass room='B'/>
          </div>
        </div>
      </div>
    );
  }

  componentWillMount() {
    if(window.localStorage.getItem('com.classly')) {
      Auth.signedin({token: window.localStorage.getItem('com.classly'), email: window.localStorage.getItem('email')}, function(result) {
        console.log('Result from componentWillMount dash', result);
        // const path = window.localStorage.getItem('id')+ '/dashboard';
        // browserHistory.push(path);

      });
    } else {
      browserHistory.push('/');    
    }
  }

};

export default DashboardLayout;
