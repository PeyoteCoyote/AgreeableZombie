import React, { Component } from 'react';
import DashboardLayout from './dashboard-layout';

class DashboardLayoutWrapper extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <DashboardLayout path={this.props.path}/>
    );
  }
}

export default DashboardLayoutWrapper;