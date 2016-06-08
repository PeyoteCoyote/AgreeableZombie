import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//Layouts
import MainLayout from './components/main-layout';
import LandingLayout from './components/landing-layout';

//Pages
import Landing from './components/Landing';


export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={LandingLayout}>
        
      </Route>


    </Route>
  </Router>
);