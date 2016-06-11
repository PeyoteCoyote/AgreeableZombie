import React, { Component } from 'react';
import { Link } from 'react-router';

class StartClass extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <Link to='/classroom' className="startclass">Join a Classroom</Link>
      </div>
    );
  }
}

//Took out
//to={this.props + '/classroom'} 

export default StartClass;
