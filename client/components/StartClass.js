import React, {Component} from 'react';
import { Link } from 'react-router';

class StartClass extends Component{
	constructor(props){
		super(props);
	}
  render() {
    return (
      <div>
          <Link to = {{ pathname: "/classroom/"+this.props.room, state:{message: 'hello dan'}}} className= "startclass student">Student</Link>
					  <Link to = {{ pathname: "/classroom/"+this.props.room, state:{message: 'hello dan'}}} className= "startclass">Teacher</Link>
      </div>
    );
  }
};

export default StartClass;
