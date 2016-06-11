import React, { PropTypes, Component } from 'react';
import StartClass from './StartClass';

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
        <StartClass/>
        <h1>this.props.path: {this.props.path}</h1>
      </div>
    );
  }
};

export default DashboardLayout;
