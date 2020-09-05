import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import {
  Navbar,
  Nav
} from 'react-bootstrap';
import './css/App.css';

import WhyChooseUs from '../share/components/WhyChooseUs'
import Home from '../share/components/Home'
import CareerSolutionEveryone from "../share/components/CareerSolutionEveryone"
import BlogDetailedPage from '../share/components/Blog/BlogDetailedPage'
import BlogList from '../share/components/Blog/BlogList'
import About from '../share/components/About'
import BeyondMentorship from '../share/components/BeyondMentorship'
import WhyChooseMentomeet from '../share/components/WhyChooseMentomeet'
import MentorList from '../share/components/MentorList'
import MentorCreateForm from './components/Mentor/MentorCreateForm';
import MenteeCreateForm from './components/Mentee/MenteeCreateForm';
import BlogCreateForm from '../share/components/Blog/BlogCreateForm';

function App() {
  return (
    <Fragment>
      <Router>

        {/* Create a Navigation bar type something */}
        <Navbar bg="light" expand="lg">
          <Navbar.Brand>Mentomeet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* left Navbar Menu */}
            </Nav>
            <Nav>
              {/* Right Navbar menu */}
              <Nav.Link>
                <Link to="/createBlog">createBlog</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/">createMentor</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/createMentee">createMentee</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/blogs">Blogs</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/mentors">Mentors</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/mentors">
            <MentorList />
          </Route>
          <Route path="/createMentee">
            <MenteeCreateForm />
          </Route>
          <Route path="/createBlog">
            <BlogCreateForm />
          </Route>
          <Route path="/blogs">
            <BlogDetailedPage />
            <BlogList />
          </Route>
          <Route path="/">
            <MentorCreateForm />
            {/* Home Page */}
            {/* <Home />
            <CareerSolutionEveryone />
            <WhyChooseUs />
            <About />
            <BeyondMentorship />
            <WhyChooseMentomeet /> */}
          </Route>
        </Switch>

      </Router>
    </Fragment>
  )
}

export default App;
