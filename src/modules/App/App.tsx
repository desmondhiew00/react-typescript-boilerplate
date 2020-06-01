import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import IdleTimer from './components/IdleTimer';
import { HomePage } from './containers/HomePage';
import { Navbar } from './containers/Navbar';
import { Sidebar } from './containers/Sidebar';

import './App.scss';

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
