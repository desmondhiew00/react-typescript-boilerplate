import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import IdleTimer from '../../components/IdleTimer';
import { HomePage } from '../HomePage';
import { Navbar } from '../Navbar';
import { Sidebar } from '../Sidebar';

import './style/index.scss';

export const App = () => {
  return (
    <>
      <IdleTimer />

      <div className="app">
        <div className="side">
          <Sidebar />
        </div>

        <div className="center">
          <Navbar />

          <div className="content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/home" component={HomePage} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
