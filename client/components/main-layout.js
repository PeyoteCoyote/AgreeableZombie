import React from 'react';
import { Link } from 'react-router';

const MainLayout = React.createClass({
  render: function() {
    return (
      <div className="app">
        <div className="primary-header">Class.ly</div>
        <Link className="login-link" to="/" activeClassName="active">Log In</Link>
        <div className="primary-aside"></div>
        <main>
          {this.props.children}
        </main>
      </div>
    );
  }
});

export default MainLayout;