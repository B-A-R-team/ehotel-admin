import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Admin from './Admin';
import Login from '../login/login';

export default function AdminRoute() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route component={Admin} />
      </Switch>
    </HashRouter>
  );
}
