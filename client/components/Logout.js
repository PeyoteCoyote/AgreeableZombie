import React, {Component} from 'react';
import { Link } from 'react-router';

class Logout extends Component{
  constructor(props){
    super(props);
  }

  logout() {
    window.localStorage.removeItem('com.classly');
    location.reload();
  }

  render() {
    return (
      <div>
          <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
};

export default Logout;
