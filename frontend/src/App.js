import React from 'react';

import './css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Index from './components/index.js'
import Question from './components/Question/Question.js'
import Answer from './components/Answer/Answer'
import Login from './components/Login/Login'
import Otp from './components/Login/Otp'
import Chat from './components/Chat/Chat/Chat.js'
import Join from './components/Chat/Join/Join.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <ReactNotification /> */}
        <div>
            <Switch>

                <Route path="/index" render={props => <Index {...props} /> } />
                <Route path="/qna" render={props => <Question {...props} /> } />
                <Route path="/answer" render={props => <Answer {...props} /> } />
                <Route exact path="/login" render={props => <Login {...props} /> } />
                <Route exact path="/Otp" render={props => <Otp {...props} /> } />
                <Route path="/join" render={props => <Join {...props} /> } />
                <Route path="/chat" render={props => <Chat {...props} /> } />
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
