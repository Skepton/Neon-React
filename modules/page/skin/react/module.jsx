import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactRouter from 'router/skin/react/components/router';

ReactDOM.render(
  <BrowserRouter>
    <Switch children={ routes.map((route, index) => (
        <Route exact path={route} render={(props) => (<ReactRouter routeProps={props} route={route} />)} key={index} />
      ))} />
  </BrowserRouter>,
  document.getElementById('Neon')
);
