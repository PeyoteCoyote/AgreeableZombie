import React from 'react';
import { Link } from 'react-router';

const StartClass = React.createClass({
  render: function() {
    return (
      <div>
          <Link to = "/classroom" className= "startclass">Join a Classroom</Link>
      </div>
    );
  }
});

export default StartClass;
