import React from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Jumbotron } from 'react-bootstrap';


import './App.css';
import { cssNumber } from 'jquery';


class MentorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: 'My Name',
      authorDescription: 'My desicription is my description, none of your description. Yes Hello!',
      showAllPosts: false,
      posts: [
        {
          title: 'Title 1',
          date: 'August 25'
        },
        {
          title: 'Title 2',
          date: 'August 24'
        },
        {
          title: 'Title 3',
          date: 'August 23'
        },
        {
          title: 'Title 4',
          date: 'August 23'
        },
        {
          title: 'Title 4',
          date: 'August 23'
        }
      ]
    }

    this.toggleAllPosts = this.toggleAllPosts.bind(this);
  }

  /* This toggle the showAllPosts state */
  toggleAllPosts() {
    if (this.state.showAllPosts) {
      this.setState({
        showAllPosts: false
      });
    } else {
      this.setState({
        showAllPosts: true
      });
    }
  }

  updateProfileData = (userId) => {
    // Here in this function, the userId of the user will be given
    // TODO Make a fetch request and according to that just update the state of the component
    // State variables can be found in the constructor and you will have to just call setState after the fetch
    // And the render will auctomatically happen!!
    console.log("Fetch user data for userId", userId);
  }

  componentDidMount() {
    console.log("Component did mount in mentorProfile");

    const { match } = this.props;
    // match.params.id - The user Id for other users
    console.log("The id given", match.params.id);
    // If the id does not exist this means open the current user profile

    if (match.params.id) {
      this.updateProfileData(match.params.id);
    } else {
      const uId = JSON.parse(localStorage.getItem('user'));
      console.log("My User Id", uId)
    }

  }

  render() {

    // Creating of all the posts using the state
    // Can be changed to props if this info is static and passed using props
    const postsElementsList = [];
    const posts = this.state.posts;
    const showAllPosts = this.state.showAllPosts;

    const { match } = this.props;
    // match.params.id - The user Id for other users
    console.log("The id", match.params.id)
    // If the id does not exist this means open the current user profile

    let updateBtn = '';
    if (match.params.id) {
      // Do not show the edit button
      updateBtn = '';
    } else {
      // This is the user profile, user can update the form
      updateBtn = (
        <div style={{ margin: "8px 0 20px 0" }}>
           <Link to="/mentor">Update Profile</Link>
        </div>
      )
    }

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      var toHide = "hidden";
      if(showAllPosts){
        toHide = "";
      }
      if(i<3){
        toHide = "";
      }

      postsElementsList.push(
        <Col key={i} sm={4} className={toHide}>
          <Card className="posts-card">
            <Card.Img variant="top" src="/logo512.png" />
            <Card.Body>
              <Card.Title> {post.title} </Card.Title>
              <Card.Text>
                {post.date}
              </Card.Text>
            </Card.Body>

            {/* Add REST OF INFORMATION HERE */}

          </Card>
        </Col>
      )
    }


    return (
      <div className="App">
        <h2 style={{ padding: "8px", background: "#fff" }}>Profile Detailed View</h2>
        <Container fluid id="faculty-main-content">
          <Row>
            <Col sm={3}>
              <Card id="profile-card">
                <Card.Img variant="top" src="/logo512.png" />
                <Card.Body>
                  <Card.Title>{this.state.authorName}</Card.Title>
                  <Card.Text>
                    {this.state.authorDescription}
                  </Card.Text>
                  <Button variant="primary">Contact</Button>
                </Card.Body>

                {updateBtn}
                {/* Add REST OF INFORMATION HERE */}

              </Card>
            </Col>
            <Col sm={9}>
              <div id="main-content">
                <div id="posts-container">
                  <Jumbotron id="posts-jumbotron">
                    <div id="posts-top-menu">
                      <h3>Posts</h3>
                      <div className="right-buttons">
                        <Button onClick={this.toggleAllPosts} size="sm" variant="outline-info">Show All</Button>
                      </div>
                    </div>
                    <Row id="posts-body">
                      {postsElementsList}
                    </Row>
                  </Jumbotron>

                </div>
                <div id="background-container">
                  <Jumbotron id="background-jumbotron">
                    <h3>background</h3>
                    {/*  Add more here */}
                  </Jumbotron>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default MentorProfile;
