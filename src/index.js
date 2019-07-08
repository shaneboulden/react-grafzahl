import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "@patternfly/react-core/dist/styles/base.css";
import PageLayoutSimpleNav from './pages/base.js';
import Home from './pages/home.js';
import './app.css';

ReactDOM.render(

  <PageLayoutSimpleNav>
    <Router>
      <Switch>
        <Route exact path="/" component={ Home }/>
      </Switch>
    </Router>
  </PageLayoutSimpleNav>,
  document.getElementById('root')
)
