import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Jumbotron } from 'react-bootstrap';


import './App.css';


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

  render() {

    // Creating of all the posts using the state
    // Can be changed to props if this info is static and passed using props
    const postsElementsList = [];
    const posts = this.state.posts;
    const showAllPosts = this.state.showAllPosts;
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
        <Col sm={4} className={toHide}>
          <Card className="posts-card">
            <Card.Img variant="top" src="logo512.png" />
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
                <Card.Img variant="top" src="logo512.png" />
                <Card.Body>
                  <Card.Title>{this.state.authorName}</Card.Title>
                  <Card.Text>
                    {this.state.authorDescription}
                  </Card.Text>
                  <Button variant="primary">Contact</Button>
                </Card.Body>

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
