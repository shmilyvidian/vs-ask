import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import routes from 'routers'

let RoutesConfig = () => (
  <Router>
      <Switch>
          {routes.map((route, index) =>
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={ props => {
                     if (props.location.pathname === '/') {
                         return <Redirect to="/index" />
                     } else {
                        return  <route.component {...props} routes={route.routes} />
                     }
                  }}
              />)}
      </Switch>
  </Router>
)


ReactDOM.render(
    <RoutesConfig />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
