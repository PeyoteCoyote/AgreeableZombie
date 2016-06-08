import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//Layouts
import MainLayout from './components/main-layout';

//Pages
import Landing from './components/Landing';


export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Landing} />

    </Route>
  </Router>
);