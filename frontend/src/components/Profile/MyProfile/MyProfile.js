import React from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Jumbotron } from 'react-bootstrap';
import { ListGroup, ListGroupItem, Badge} from 'reactstrap';

import {checktoken} from "../../CommonFunc/common.js"

import './App.css';
import { cssNumber } from 'jquery';


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: 'fullName',//currentUser.firstName+" "+currentUser.lastName,
      role: 'Mentor',//currentUser.role,
      showAllPosts: false,
      email: 'Email',
      profileFilled:true,
      profile_picture:null,
      //mentor
      year:null,college_type:null,college:null,language:null,start_time:null,end_time:null,
      about_me:null,rank:null,fb_link:null,linkedin_link:null,
      //mentee
      coaching:null,standard:null,subject:null,category:null,
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
      ],
      error: null,
      isLoaded: false
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

  updateProfileData = (Role,userId) => {
    // Here in this function, the userId of the user will be given
    // TODO Make a fetch request and according to that just update the state of the component
    // State variables can be found in the constructor and you will have to just call setState after the fetch
    // And the render will auctomatically happen!!
    console.log("Fetch user data for userId",Role, userId);
   // if(Role ==='Mentor'){
    const endpoint = `http://${window.location.hostname}:5005/profile/${userId}`;  
    fetch(endpoint)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Response data :", result);
          console.log(result.firstName)
         var profileFilled=true;
         if(result.history.length==0){
          profileFilled=false;
          this.setState({
            profileFilled:profileFilled
          })
         }
        console.log(result)
         if ((result.role==='Mentor'||result.category==='Mentor')&& profileFilled){
          const profile_picture = result.history[0].profile_picture;
          const fullName = result.firstName+" "+result.lastName;
          const email = result.email;          
          const branch = result.history[0].branch;
          const year = result.history[0].year;
          const language = result.history[0].language;
          const college = result.history[0].college;
          const college_type = result.history[0].college_type;          
          const rank = result.history[0].rank;
          const expertise = result.history[0].expertise;
          const start_time = result.history[0].start_time;
          const end_time = result.history[0].end_time;
          const fb_link = result.history[0].fb_link;
          const linkedin_link = result.history[0].linkedin_link;
          const about_me = result.history[0].about_me;
          this.setState({
            isLoaded: true,
            fullName: fullName,
            role: 'Mentor',email:email,profile_picture:profile_picture,
            //mentor specific
            year:year,college_type:college_type,college:college,language:language,linkedin_link:linkedin_link,
            start_time:start_time,end_time:end_time,about_me:about_me,rank:rank,fb_link:fb_link,expertise:expertise,branch:branch,
           
          });
          
         }
         else if(((result.role==='Mentee'||result.category==='Mentee')&& profileFilled)) {
          const fullName = result.firstName+" "+result.lastName;
          const email = result.email;   
          const profile_picture = result.history[0].profile_picture;
          const standard = result.history[0].standard;
          const coaching = result.history[0].coaching;
          const category = result.history[0].category;
          const subject = result.history[0].subject;
          this.setState({
            isLoaded: true,
            fullName: fullName,
            email:email,
            role:'Mentee',
            //mentee specific
            profile_picture:profile_picture,
            standard:standard,coaching:coaching,category:category,subject:subject,
            
          });
         } 

        },
         (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )


    
    
  }

  componentDidMount() {
    console.log("Component did mount in mentorProfile");
    checktoken();

    const { match } = this.props;
    // match.params.id - The user Id for other users
    // If the id does not exist this means open the current user profile
    if(localStorage.getItem('user')){
      const Role=   JSON.parse(localStorage.getItem('user')).role
      const uId = JSON.parse(localStorage.getItem('user'))._id;
      console.log("My User Id", uId)
      this.updateProfileData(Role,uId);
    }
    
    
      
    

  }

  render() {

    // Creating of all the posts using the state
    // Can be changed to props if this info is static and passed using props
    const currentUser =localStorage.getItem('user')
    //if(currentUser)
    const role=JSON.parse(currentUser).role
    const postsElementsList = [];
    const posts = this.state.posts;
    const showAllPosts = this.state.showAllPosts;

    const { match } = this.props;
    // match.params.id - The user Id for other users
    // If the id does not exist this means open the current user profile
    let updateBtn = '';
    if(role=='Mentor'){
      updateBtn = (
        <div style={{ margin: "8px 0 20px 0" }}>
          <Link to="/mentor">Update Profile</Link>
        </div>
      )
    }else {
      updateBtn = (
        <div style={{ margin: "8px 0 20px 0" }}>
          <Link to="/mentee">Update Profile</Link>
        </div>
      )
    }
      
    

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];

      var toHide = "hidden";
      if (showAllPosts) {
        toHide = "";
      }
      if (i < 3) {
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
  
  if(currentUser==null|| !this.state.profileFilled){
    return (
      <div className="App">
        <h2 style={{ padding: "8px", background: "#fff" }}>Profile  View</h2>
        <Container fluid id="faculty-main-content">
          <Row>
            <Col sm={3}>
              <Card id="profile-card" style={{paddingTop:"20px"}}>
                <Card.Img variant="top" style={{borderRadius:"50%", width:"150px", height:"150px"}} src={this.state.profile_picture===null ? require('./../../../assets/default-avatar.png') : this.state.profile_picture} />
                <Card.Body>
                  <Card.Title>Your Name</Card.Title>
                  <Card.Text>
                    Role
                  </Card.Text>
                  <Button variant="primary">Contact</Button>
                </Card.Body>

                {updateBtn}
                {/* Add REST OF INFORMATION HERE */}

              </Card>
            </Col>
            <Col sm={9}>
              <div id="main-content">
                <div id="background-container">
                  <Jumbotron id="background-jumbotron">
                    <Card>
                      <Card.Header>My Details:</Card.Header>
                      {/* <Card.Title><h3>My Details:</h3></Card.Title> */}
                      <Card.Body>
                        <Row>
                          <Col>
                            <p>Please update your profile</p>
                            {updateBtn}
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Jumbotron>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
  if((role==='Mentor')){
    
    return (
      <div className="App">
        <h2 style={{padding:"20px"}}>My Profile Page</h2>
        <Container fluid id="faculty-main-content">
          <Row>
            <Col md={3}>
              <Card id="profile-card" style={{paddingTop:"20px"}}>
                <Card.Img variant="top" style={{borderRadius:"50%", width:"150px", height:"150px"}} src={this.state.profile_picture===null ? require('./../../../assets/default-avatar.png') : this.state.profile_picture} />
                <Card.Body>
                  <Card.Title>{this.state.fullName}</Card.Title>
                  <Card.Text>
                    {this.state.role}
                  </Card.Text>
                  <Button variant="primary">Contact</Button>
                </Card.Body>

                {updateBtn}
                {/* Add REST OF INFORMATION HERE */}

              </Card>
            </Col>
            <Col md={9}>
              <div id="main-content">
                <div id="background-container">
                  <Jumbotron id="background-jumbotron">
                    
                    <Card>
                      <Card.Header>My Details:</Card.Header>
                      {/* <Card.Title><h3>My Details:</h3></Card.Title> */}
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <p> Year :{this.state.year}</p>
                            <p> Branch :{this.state.branch} </p>
                            <p> College_type :{this.state.college_type}</p>
                            <p> College :{this.state.college} </p>
                            <p> Rank : <Badge color="success">{this.state.rank}</Badge></p>
                          </Col>
                          <Col>
                            <p> Expertise :{this.state.expertise}</p>
                            <p> Online start_time:{this.state.start_time}, end_time:{this.state.end_time} </p>
                            <p> Facebook profile :{this.state.fb_link} </p>
                            <p> Linkedin profile :{this.state.linkedin_link}</p>
                            <p> About Me :{this.state.about_me} </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Jumbotron>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  else{
    return (
      <div className="App">
        <h2 style={{padding:"20px"}}>My Profile Page</h2>
        <Container fluid id="faculty-main-content">
          <Row>
            <Col md={3}>
              <Card id="profile-card" style={{paddingTop:"20px"}}>
                <Card.Img variant="top" style={{borderRadius:"50%", width:"150px", height:"150px"}} src={this.state.profile_picture===null ? require('./../../../assets/default-avatar.png') : this.state.profile_picture} />
                <Card.Body>
                  <Card.Title>{this.state.fullName}</Card.Title>
                  <Card.Text>
                    {this.state.role}
                  </Card.Text>
                  {/* <Button variant="primary">Contact</Button> */}
                </Card.Body>

                {updateBtn}
                {/* Add REST OF INFORMATION HERE */}

              </Card>
            </Col>
            <Col md={9}>
              <div id="main-content">
                <div id="background-container">
                  <Jumbotron id="background-jumbotron">
                    
                    <Card>
                      <Card.Header>My Details:</Card.Header>
                      {/* <Card.Title><h3>My Details:</h3></Card.Title> */}
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <p> Class/Year : {this.state.standard}</p>
                            <p> Coaching : {this.state.coaching} </p>
                          </Col>
                          <Col>
                            <p> Category : <Badge color="success">{this.state.category}</Badge></p>
                            <p> Subject :{this.state.subject} </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
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
  
  
}

export default MyProfile;
