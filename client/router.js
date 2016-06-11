import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//Layouts
import MainLayout from './components/main-layout';
import LandingLayout from './components/landing-layout';
import DashboardLayout from './components/dashboard-layout';
import ClassroomLayout from './components/App';

//Pages
import Landing from './components/Landing';
import StartClass from './components/StartClass';


export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={LandingLayout}><Landing/></Route>
      <Route path="/dashboard" component={DashboardLayout}><StartClass/></Route>
      <Route path="/classroom/*" component={ClassroomLayout}></Route>
    </Route>
  </Router>
);
