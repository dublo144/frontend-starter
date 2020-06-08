import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from '../containers/noMatch';
import Content3 from '../containers/content3';
import Scrape from '../containers/scrape/Scrape.jsx';
import Jokes from '../containers/jokes';
import Home from '../containers/home/Home.jsx';
import ProtectedRoute from '../components/routes/ProtectedRoute.jsx';
import Unauthorized from '../containers/unauthorized';
import Count from '../containers/counter/Count.jsx';
import AsyncDispatch from '../containers/asyncDispatch/AsyncDispatch.jsx';
import { AsyncProvider } from '../contexts/AsyncContext.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <ProtectedRoute authenticatedRoles={['admin']} path='/jokes'>
        <Jokes />
      </ProtectedRoute>

      <ProtectedRoute authenticatedRoles={['admin']} path='/scrape'>
        <Scrape />
      </ProtectedRoute>

      <Route path='/content3'>
        <Content3 />
      </Route>

      <Route path='/counter'>
        <Count />
      </Route>

      <Route path='/asyncUsers'>
        <AsyncProvider>
          <AsyncDispatch />
        </AsyncProvider>
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
