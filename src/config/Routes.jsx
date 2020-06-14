import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from '../containers/noMatch';
import Home from '../containers/home/Home.jsx';
import Unauthorized from '../containers/unauthorized';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/unauthorized'>
        <Unauthorized />
      </Route>

      <Route>
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
