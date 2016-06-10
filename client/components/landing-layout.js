import React, { PropTypes, Component } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Landing from './Landing';

class LandingLayout extends Component{
  constructor(props){
    super(props)
    this.state = {
      signup : false
    }
  }
  openSignup(signup){
    console.log('This is state:', this.state.signup, 'setting it to:', signup);
    this.setState({signup : signup});
  }
  handleClick(){
    console.log('I am being clicked');
    this.openSignup(!this.state.signup);
  }

  render() {
    var sidebar = this.state.signup ? <Signup fn={this.handleClick.bind(this)} /> : <Signin fn={this.handleClick.bind(this)} />;
    return (
      <div className="Landing">
          <Landing />
        <div className="primary-aside">
          {sidebar}
        </div>
      </div>
    );
  }
};

export default LandingLayout;
