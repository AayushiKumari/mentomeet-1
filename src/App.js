import React from 'react';

import './css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from './components/index.js'


function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <ReactNotification /> */}
        <div>
            <Switch>

                <Route path="/index" render={props => <Index {...props} /> } />
                {/* <Route path="/login" render={props => <Login {...props} /> } />
                <Route path="/student" render={props => <Student {...props} /> } /> */}

                <Redirect to="/index" />
                <Redirect from="/" to="/index" />
            </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
