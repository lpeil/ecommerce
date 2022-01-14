import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import HomeScreen from './screens/home/home.screen';
import NotFoundScreen from './screens/notFound/not-found.screen';

export const history = createBrowserHistory();

function AppRoutes() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    </ConnectedRouter>
  );
}

export default AppRoutes;
