import React, { PropTypes, Component } from 'react';

const MainLayout = React.createClass({
  render: function() {
    return (
          <div className="app">
            <div className="primary-header">learn with me</div>
            <main>
              {this.props.children}
            </main>
          </div>
    );
  }

});


export default MainLayout;
