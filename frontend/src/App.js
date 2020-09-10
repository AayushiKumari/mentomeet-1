import React, { Fragment } from 'react';

import './css/App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import BlogDetailedPage from './components/Blog/BlogDetailedPage.js'
import BlogList from './components/Blog/BlogList.js'
import MentorList from './components/Mentor/MentorList'
import MentorCreateForm from './components/Mentor/MentorCreateForm';
import MentorProfile from './components/Mentor/MentorProfile/MentorProfile.js'
import MenteeCreateForm from './components/Mentee/MenteeCreateForm';
import BlogCreateForm from './components/Blog/BlogCreateForm';



import Index from './components/index.js'
import Question from './components/Question/Question.js'
import Answer from './components/Answer/Answer'
import Login from './components/Login/Login'
import Chat from './components/Chat/Chat/Chat.js'
import Join from './components/Chat/Join/Join.js'
import NavBar from './components/NavBar'

function App() {
  return (
    <Fragment>
      <BrowserRouter>

        <NavBar />
        {/* <ReactNotification /> */}
        <div>
          <Switch>

            {/* blogs,mentors,mentees */}
            <Route path="/blogdetail" render={props => <BlogDetailedPage {...props} />} />
            <Route path="/blogs" render={props => <BlogList {...props} />} />
            <Route path="/mentors" render={props => <MentorList {...props} />} />
            <Route path="/blog" render={props => <BlogCreateForm {...props} />} />
            <Route path="/mentor" render={props => <MentorCreateForm {...props} />} />

            {/* Using the same Mentor Profile component, with different options changed in the file */}
            <Route path="/profile/:id" render={props => <MentorProfile {...props} />} />
            <Route path="/profile" render={props => <MentorProfile {...props} />} />
            
            <Route path="/mentee" render={props => <MenteeCreateForm {...props} />} />
            {/* <Route path="/qna" render={props => <Question {...props} /> } /> */}

            <Route path="/index" render={props => <Index {...props} />} />
            <Route path="/qna" render={props => <Question {...props} />} />
            <Route path="/answer/:id" render={props => <Answer {...props} />} />
            <Route exact path="/login" render={props => <Login {...props} />} />
            <Route path="/join" render={props => <Join {...props} />} />
            <Route path="/chat" render={props => <Chat {...props} />} />
            {/* <Route path="/login" render={props => <Login {...props} /> } />
                <Route path="/student" render={props => <Student {...props} /> } /> */}

            <Redirect to="/index" />
            <Redirect from="/" to="/index" />
          </Switch>
        </div>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
