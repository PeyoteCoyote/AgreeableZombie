import React, { PropTypes, Component } from 'react';

const MainLayout = React.createClass({
  render: function() {
    return (
          <div className="app">
            <div className="primary-header">Class.ly</div>
            <main>
              {this.props.children}
            </main>
          </div>
    );
  }

});


export default MainLayout;
