import React from 'react';

import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Card, Jumbotron } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';



import './App.css';
import { cssNumber } from 'jquery';


class MentorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: 'fullName',//currentUser.firstName+" "+currentUser.lastName,
      role: 'Mentor',//currentUser.role,
      showAllPosts: false,
      email: 'Email',
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
    if(Role ==='Mentor'){
const endpoint = `http://${window.location.hostname}:5005/mentors/${userId}`;  
    fetch(endpoint)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Response data of mentors came", result);

          // Now add the data as required and update the state
         // const role = result.detail.about_me;
          const posts = result.myblogs;
          const profile_picture = result.detail.profile_picture;
          const fullName = result.detail.first_name+" "+result.detail.last_name;
          const email = result.detail.email;          
          const branch = result.detail.branch;
          const year = result.detail.year;
          const language = result.detail.language;
          const college = result.detail.college;
          const college_type = result.detail.college_type;          
          const category = result.detail.category;
          const rank = result.detail.rank;
          const expertise = result.detail.expertise;
          const start_time = result.detail.start_time;
          const end_time = result.detail.end_time;
          const fb_link = result.detail.fb_link;
          const linkedin_link = result.detail.linkedin_link;
          const about_me = result.detail.about_me;

          // Add more field as to show accordingly
          // TODO check for all the details

          // SAMPLE DATA currently on which it is working
          /*
            "myblogs": [],
            "myfollowers": 0
          }
          */

          this.setState({
            isLoaded: true,
            fullName: fullName,
            role: 'Mentor',email:result.detail.email,
            year:year,college_type:college_type,college:college,category:category,language:language,
            start_time:start_time,end_time:end_time,about_me:about_me,rank:rank,fb_link:fb_link,expertise:expertise,
            posts: posts
          });

        },
         (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )


    }
    else{
      const endpoint = `http://${window.location.hostname}:5005/mentee/${userId}`;  
      fetch(endpoint)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Response data of mentors came", result);
          // const posts = result.myblogs;
          const fullName = result.first_name+" "+result.last_name;
          const email = result.email;          
          const standard = result.standard;
          const coaching = result.coaching;
          const category = result.category;
          const subject = result.subject;
         
          // Add more field as to show accordingly
          // TODO check for all the details

          // SAMPLE DATA currently on which it is working
          /*
            "myblogs": [],
            "myfollowers": 0
          }
          */

          this.setState({
            isLoaded: true,
            fullName: fullName,
            role: 'Mentee',email:email,
            standard:standard,coaching:coaching,category:category,subject:subject,
            // start_time:start_time,end_time:end_time,about_me:about_me,rank:rank,fb_link:fb_link
            // posts: posts
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
    
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
      const uId = JSON.parse(localStorage.getItem('user'))._id;
      const Role=   JSON.parse(localStorage.getItem('user')).role
      console.log("My User Id", uId)
      this.updateProfileData(Role,uId);
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

  if(JSON.parse(localStorage.getItem('user')).role=='Mentor'){
    return (
      <div className="App">
        <h2 style={{ padding: "8px", background: "#fff" }}>Profile Detailed View</h2>
        <Container fluid id="faculty-main-content">
          <Row>
            <Col sm={3}>
              <Card id="profile-card">
                <Card.Img variant="top" src="/logo512.png" />
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
                    <ListGroup>
      <ListGroupItem justifyStart>standard :{this.state.year}</ListGroupItem>
      <ListGroupItem>branch :{this.state.branch}</ListGroupItem>
      <ListGroupItem>college_type :{this.state.college_type}</ListGroupItem>
      <ListGroupItem>coaching :{this.state.college}</ListGroupItem>
      <ListGroupItem>rank :{this.state.rank}</ListGroupItem>
      <ListGroupItem>expertise :{this.state.expertise}</ListGroupItem>
      <ListGroupItem>language :{this.state.language}</ListGroupItem>
      <ListGroupItem>start_time:{this.state.start_time}  end_time:{this.state.end_time}</ListGroupItem>
      <ListGroupItem>Facebook profile :{this.state.fb_link}</ListGroupItem>
      <ListGroupItem>Linkedin profile :{this.state.linkedin_link}</ListGroupItem>
      <ListGroupItem>About Me :{this.state.about_me}</ListGroupItem>
      {/* <ListGroupItem>coaching_type</ListGroupItem>      
      <ListGroupItem>rank</ListGroupItem> */}
    </ListGroup>
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
        <h2 style={{ padding: "8px", background: "#fff" }}>Profile Detailed View</h2>
        <Container fluid id="faculty-main-content">
          <Row>
            <Col sm={3}>
              <Card id="profile-card">
                <Card.Img variant="top" src="/logo512.png" />
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
            <Col sm={9}>
              <div id="main-content">
                {/* <div id="posts-container">
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

                </div> */}
                <div id="background-container">
                  <Jumbotron id="background-jumbotron">
                    <h3>background</h3>
                    <ListGroupItem justifyStart>Class/year :{this.state.standard}</ListGroupItem>
      <ListGroupItem>Coaching_type :{this.state.coaching_type}</ListGroupItem>
      <ListGroupItem>Coaching :{this.state.coaching}</ListGroupItem>
      <ListGroupItem>Category :{this.state.category}</ListGroupItem>
      <ListGroupItem>subject :{this.state.subject}</ListGroupItem>
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

export default MentorProfile;


import React, { Fragment } from 'react';
import ImageUploader from 'react-images-upload';

class MentorCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: null,
      branch: {
        value: '',
        valid: true
      },
      expertise: {
        value: 'PHYSICS',
        valid: true
      },
      college: {
        value: '',
        valid: true
      },
      year: {
        value: 1,
        valid: true
      },
      college_type: {
        value: 'IIT',
        valid: true
      },
      category: {
        value: 'NEET',
        valid: true
      },
      rank: {
        value: '',
        valid: true
      },
      start_time: {
        value: '',
        valid: true
      },
      end_time: {
        value: '',
        valid: true
      },
      fb_link: {
        value: '',
        valid: true
      },
      linkedin_link: {
        value: '',
        valid: true
      },
      about_me: {
        value: '',
        valid: true
      }
    }

    // Binding to class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
  }
  
  onFileChangeHandler = (e) => {
    this.setState({
        profile_picture: e.target.files[0]
    })
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log("Handle Change Event", name, value);

    switch (name) {
      case 'fb_link':

        // Check for the required condition
        var isValid = true;
        var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (value.trim().length > 200|| !res) {
          isValid = false;
        }

        this.setState({
          fb_link: {
            value: value,
            valid: isValid
          }
        });

        break;

      case 'linkedin_link':
        var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        // Now check for all the required checks
        var isValid = true;
        // var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (value.trim().length > 200|| !res) {
          isValid = false;
        }

        this.setState({
          linkedin_link: {
            value: value,
            valid: isValid
          }
        });

        break;

      case 'expertise':

        // Check if about_me is valid or not

        var isValid = true;
        if (value.trim().length > 100) {
          isValid = false;
        }

        this.setState({
          expertise: {
            value: value,
            valid: isValid
          }
        });
        break;



      case 'branch':

        var isValid = true;
        if (value.trim().length > 100) {
          isValid = false;
        }

        this.setState({
          branch: {
            value: value,
            valid: isValid
          }
        });
        break;

      case 'college':

        // check for the correct email
        var isValid = true;
        this.setState({
          college: {
            value: value,
            valid: isValid
          }
        })
        break;

      case 'year':

        var isValid = true;
        if (Number.isInteger(value) && value > 0 && value < 6) {
          isValid = false;
        }
        this.setState({
          year: {
            value: value,
            valid: isValid
          }
        })
        break;

      case 'college_type':

        // check for the correct email
        var isValid = true;
        this.setState({
          college_type: {
            value: value,
            valid: isValid
          }
        })
        break;

      case 'category':

        // Catergory will be always true
        this.setState({
          category: {
            value: value,
            valid: true
          }
        });
        break;

      case 'rank':
        // check for the correct email
        var isValid = true;
        this.setState({
          rank: {
            value: value,
            valid: isValid
          }
        })
        break;
      case 'start_time':
        // check for the correct email
        var isValid = true;
        this.setState({
          start_time: {
            value: value,
            valid: isValid
          }
        })
        break;
      case 'end_time':
        // check for the correct email
        var isValid = true;
        this.setState({
          end_time: {
            value: value,
            valid: isValid
          }
        })
        break;
      case 'about_me':

          // about_me will be always true
        this.setState({
          about_me: {
            value: value,
            valid: true
                }
              });
        break;  
    }
  }

  makePostRequest = (data,userId) => {
    const endpoint = `http://${window.location.hostname}:5005/mentor/${userId}`;
    // CSRF Token if needed

    let lookupOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(endpoint, lookupOptions)
      .then(response => {
        if (response.status !== 401 && response.status !== 400) {

          if (response) {
            alert("Good job!  Successfully added as a mentor")
            console.log("Response came", response.text());
          }
          //   window.location.href="/"

        }
        else { console.log(response.text()); alert(":(' please check your inputs") }
        // window.location.href= '/mentors/'+response.text()._id
      })
      .catch(error => {
        console.log("Error in makePostRequest", error);
        alert("An error occured, please try again");
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Handling form submit",localStorage.getItem('user'));

    const profile_picture = this.state.profile_picture;
    // Here we will also check if he has filled all or not
    // Here we will also finally check that all number entries are numbers
    const fb_link = this.state.fb_link.value;
    const isValidFbLink = this.state.fb_link.valid;
    const linkedin_link = this.state.linkedin_link.value;
    const isValidLinkedInLink = this.state.linkedin_link.valid;
    const expertise = this.state.expertise.value;
    const isValidExpertise = this.state.expertise.valid;
    const branch = this.state.branch.value;
    const isValidBranch = this.state.branch.valid;
    const college = this.state.college.value;
    const isValidCollege = this.state.college.valid;
    const year = this.state.year.value;
    const isValidYear = this.state.year.valid;
    const college_type = this.state.college_type.value;
    const isValidCollegeType = this.state.college_type.valid;
    const category = this.state.category.value;
    const isValidCategory = this.state.category.valid;
    const rank = this.state.rank.value;
    const isValidRank = this.state.rank.valid;
    const start_time = this.state.start_time.value;
    const end_time = this.state.end_time.value;

    const allAreValid = isValidFbLink & isValidLinkedInLink & isValidExpertise & isValidBranch & isValidCollege & isValidYear & isValidCollegeType & isValidCategory & isValidRank;

    if (allAreValid) {
      // Now this means all are valid field
      // We are good to go and make a post request
      var reqBody = {};
      //reqBody['user'] =JSON.parse(localStorage.getItem('user'))._id
      // reqBody['first_name'] =JSON.parse(localStorage.getItem('user')).firstName
      // reqBody['last_name'] =JSON.parse(localStorage.getItem('user')).lastName
      // reqBody['phone'] =JSON.parse(localStorage.getItem('user')).mobile
      // reqBody['email'] =JSON.parse(localStorage.getItem('user')).email
      reqBody['about_me']=this.state.about_me.value
      reqBody['profile_picture'] = profile_picture;
      reqBody['fb_link'] = fb_link;
      reqBody['linkedin_link'] = linkedin_link;
      reqBody['expertise'] = expertise;
      reqBody['branch'] = branch;
      reqBody['start_time'] = start_time;
      reqBody['end_time'] = end_time;
      reqBody['college'] = college;
      reqBody['year'] = year;
      reqBody['college_type'] = college_type;
      reqBody['category'] = category;
      reqBody['rank'] = rank;
      //  reqBody['language'] = ['English'];
      const userId=JSON.parse(localStorage.getItem('user'))._id
      this.makePostRequest(reqBody,userId);

    } else {
      alert('Check all fields are valid');
    }

    // Here we will make the post request

    // Also perform some checcks like phone is a number or not
  }

 
  componentDidMount() {
    // Here we will update the user details of the currently logged in User
    // Se get the userId of the user from the token storage and then
    // Fetch the data and then update the current state
    // A suggestion (NOt necessary), show a loading sign or somthing using the react state until the aPI request succeeds
    // Take care that fetch is asynchronous
    console.log("START WRITING CODE IN componentDidMount")
  }

  render() {

    const isValidFbLink = this.state.fb_link.valid;
    const isValidLinkedInLink = this.state.linkedin_link.valid;
    const isValidExpertise = this.state.expertise.valid;
    const isValidBranch = this.state.branch.valid;
    const isValidCollege = this.state.college.valid;
    const isValidYear = this.state.year.valid;
    const isValidCollegeType = this.state.college_type.valid;
    const isValidCategory = this.state.category.valid;
    const isValidRank = this.state.rank.valid;

    return (
      <Fragment>
        <div className="container" style={{ marginTop: "24px", marginBottom: "48px" }}>

          <h3 style={{ textAlign: "center" }}>Update Mentor Profile</h3>

          <form
            id="create-mentor-form"
            onSubmit={this.handleSubmit}
          >

            {/* Input body image */}
            <div className="form-group">
              <label htmlFor="profile_picture">Upload Profile picture</label><br />
              <input
                name="profile_picture"
                type="file"
                placeholder="Select image"
                onChange={this.onFileChangeHandler}
              />
            </div>


            <div className="row">
              <div className="col-sm-6">

                {/* Select Year */}
                <div className="form-group">
                  <label htmlFor="year">Year*</label>
                  <select
                    name="year"
                    placeholder="Enter Year*"
                    className={`form-control ${isValidYear ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                    required
                  >
                    <option selected value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                  {/*feedback here*/}
                  {isValidYear ? null : <div className='invalid-feedback'>Must be from given</div>}
                </div>

              </div>
              <div className="col-sm-6">

                {/* Input Branch */}
                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <input
                    name="branch"
                    type="text"
                    placeholder="Enter branch"
                    className={`form-control ${isValidBranch ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                  />
                  {/*feedback here*/}
                  {isValidBranch ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
                </div>

              </div>
            </div>


            {/* Input College */}
            <div className="form-group">
              <label htmlFor="college">Your college*</label>
              <input
                name="college"
                type="text"
                placeholder="Enter college*"
                className={`form-control ${isValidCollege ? '' : 'is-invalid'}`}
                onChange={this.handleChange}
                required
              />
              {/*feedback here*/}
              {isValidCollege ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
            </div>


            <div className="row">
              <div className="col-sm-4">
                {/* Input CollegeType */}
                <div className="form-group">
                  <label htmlFor="college-type">College Type*</label>
                  <select
                    name="college_type"
                    placeholder="Enter college type*"
                    className={`form-control ${isValidCategory ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Choose  Type*</option>
                    <option value="IIT">IIT</option>
                    <option value="AIIMS">AIIMS</option>
                    <option value="NIT">NIT</option>
                    <option value="IIIT">IIIT</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                  {/*feedback here*/}
                  {isValidCollegeType ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
                </div>
              </div>
              <div className="col-sm-4">
                {/* Select category */}
                <div className="form-group">
                  <label htmlFor="category">Category*</label>
                  <select
                    name="category"
                    placeholder="Enter category*"
                    className={`form-control ${isValidCategory ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                  >
                    <option value="JEE">JEE</option>
                    <option selected value="NEET">NEET</option>
                    <option value="CAREER">CAREER</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                  </select>
                  {/*feedback here*/}
                  {isValidCategory ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
                </div>


              </div>
              <div className="col-sm-4">
                {/* Input Rank */}
                <div className="form-group">
                  <label htmlFor="rank">Rank</label>
                  <input
                    name="rank"
                    type="number"
                    placeholder="Enter  JEE/NEET Rank"
                    className={`form-control ${isValidRank ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                  />
                  {/*feedback here*/}
                  {isValidRank ? null : <div className='invalid-feedback'>choose proper rank</div>}
                </div>
              </div>
            </div>






            {/* Input Branch */}
            <div className="form-group">

              <label htmlFor="availability_time*">Online Time range* </label>
              <div className="col-sm-6 d-flex align-items-center justify-content-center">
                <label htmlFor="start_time">start time* </label>
                <input
                  name="start_time"
                  type="time"
                  className={`form-control`}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="col-sm-6 d-flex align-items-center justify-content-center">
                <label htmlFor="end_time">end time* </label>
                <input
                  name="end_time"
                  type="time"
                  className={`form-control`}
                  onChange={this.handleChange}
                  required
                />
              </div>

            </div>


            {/* expertise  */}
            <div className="form-group">
              <label htmlFor="expertise">choose expertise</label>
              <select
                name="expertise"
                placeholder="Enter expertise"
                className={`form-control ${isValidExpertise ? '' : 'is-invalid'}`}
                onChange={this.handleChange}
                required
              >
                <option selected value="PHYSICS">PHYSICS</option>
                <option value="CHEMESTRY">CHEMESTRY</option>
                <option value="MATHS">MATHS</option>
                <option value="BIOLOGY">BIOLOGY</option>
                <option value="PCM">PCM</option>
                <option value="PCB">PCB</option>
              </select>
              {/*feedback here*/}
              {isValidExpertise ? null : <div className='invalid-feedback'>choose from given</div>}
            </div>

            {/* AboutMe  */}
            <div className="form-group">
              <label htmlFor="about_me">Your Descriptions/achievements</label>
              <textarea
                name="about_me"
                type="textarea"
                placeholder="Your Descriptions"
                onChange={this.handleChange}
              />
            </div>

            <div className="row">
              <div className="col-sm-6">
                {/* fb  Name */}
                <div className="form-group">
                  <label htmlFor="fb_link">FB Profile</label>
                  <input
                    name="fb_link"
                    placeholder="Enter FB Link"
                    className={`form-control ${isValidFbLink ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                  />
                  {/*feedback here*/}
                  {isValidFbLink ? null : <div className='invalid-feedback'>invalid url</div>}
                </div>
              </div>
              <div className="col-sm-6">
                {/* linkedin_link Name */}
                <div className="form-group">
                  <label htmlFor="linkedin_link">Linkedin Profile</label>
                  <input
                    name="linkedin_link"
                    placeholder="Enter linkedin link"
                    className={`form-control ${isValidLinkedInLink ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}

                  />
                  {/*feedback here*/}
                  {isValidLinkedInLink ? null : <div className='invalid-feedback'>invalid  url </div>}
                </div>
              </div>
            </div>




            {/* Submit button */}
            <div className="form-group">
              <button type="submit" className="btn btn-info btn-block">
                Submit
              </button>
            </div>

          </form>

        </div>
      </Fragment>
    )
  }
}

export default MentorCreateForm;

import React, { Fragment } from 'react';
//import ImageUploader from 'react-images-upload';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';


class MenteeCreateForm extends React.Component {
  constructor(props) {
    super(props);
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      // body_image: [],
      standard: {
        value: '',
        valid: true
      },
      subject: {
        value: '',
        valid: true
      },
      coaching: {
        value: '',
        valid: true
      },
      category: {
        value: 'JEE',
        valid: true
      },
      //   rank: {
      //     value: '',
      //     valid: true
      //   },
      //   availability_time: {
      //     value: '',
      //     valid: true
      //   },
      //   fb_link: {
      //     value: '',
      //     valid: true
      //   },
      //   linkedin_link: {
      //     value: '',
      //     valid: true
      //   }
    }

    // Binding to class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //   onDrop(body_image) {
  //     this.setState({
  //         body_image: this.state.body_image.concat(image),
  //     });
  // }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log("Handle Change Event", name, value);

    switch (name) {

      case 'subject':

        // Check if subject is valid or not
        var isValid = true;
        if (value.trim().length > 100) {
          isValid = false;
        }

        this.setState({
          subject: {
            value: value,
            valid: isValid
          }
        });
        break;

      case 'coaching':

        // check for the correct email
        var isValid = true;
        if (value.trim().length > 100 || value.trim().length < 1) {
          isValid = false;
        }
        this.setState({
          coaching: {
            value: value,
            valid: isValid
          }
        })
        break;

      case 'standard':

        var isValid = true;
        if (value < 0 || value > 13 || value.trim().length < 1) {
          isValid = false;
        }
        this.setState({
          standard: {
            value: value,
            valid: isValid
          }
        })
        break;

      case 'category':
        var isValid = true;
        if (value.trim().length > 100) {
          isValid = false;
        }
        this.setState({
          category: {
            value: value,
            valid: true
          }
        });
        break;


    }
  }

  makePostRequest = (data,userId) => {
    const endpoint = `http://${window.location.hostname}:5005/mentee/${userId}`;
    // CSRF Token if needed

    let lookupOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(endpoint, lookupOptions)
      .then(response => {
        if (response.status !== 401 && response.status !== 400) {

          if (response) {
            alert("Good job!  Successfully added as a mentee")
            console.log("Response came", response.text());
          }
          //  window.location.href="/"
          //catch bad request
        }
        else { console.log(response.text()); alert(":(' please check your inputs") }
        // window.location.href= '/mentors/'+response.text()._id
      })
      .catch(error => {
        console.log("Error in makePostRequest", error);
        alert("An error occured, please try again");
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Handling form submit");

    // Here we will also check if he has filled all or not
    // Here we will also finally check that all number entries are numbers
    const subject = this.state.subject.value;
    const isValidSubject = this.state.subject.valid;
    const coaching = this.state.coaching.value;
    const isValidCoaching = this.state.coaching.valid;
    const standard = this.state.standard.value;
    const isValidStandard = this.state.standard.valid;
    const category = this.state.category.value;
    const isValidCategory = this.state.category.valid;
    const allAreValid = isValidSubject & isValidCoaching & isValidStandard & isValidCategory;

    if (allAreValid) {
      // Now this means all are valid field
      // We are good to go and make a post request
      var reqBody = {};
      reqBody['subject'] = subject;
      reqBody['coaching'] = coaching;
      reqBody['standard'] = standard;
      reqBody['category'] = category;
      //  reqBody['language'] = ['English'];
      const userId =JSON.parse(localStorage.getItem('user'))._id
      this.makePostRequest(reqBody,userId);

    } else {
      alert('Check all fields are valid');
    }

    // Here we will make the post request

    // Also perform some checcks like phone is a number or not
  }

  render() {

    const isValidSubject = this.state.subject.valid;
    const isValidCoaching = this.state.coaching.valid;
    const isValidStandard = this.state.standard.valid;
    const isValidCategory = this.state.category.valid;

    return (
      <Fragment>
        <Container>
          <h3 style={{ textAlign: "center", margin: "12px 0" }}>Register as Mentee</h3>
          <form
            id="create-mentor-form"
            onSubmit={this.handleSubmit}
          >


            <Row>
              <Col sm={6}>
                {/* Select class */}
                <div className="form-group">
                  <label htmlFor="standard">Class/Year*</label>
                  <input
                    name="standard"
                    type="number"
                    placeholder="Enter Class/year "
                    className={`form-control ${isValidStandard ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                    required
                  />

                  {/*feedback here*/}
                  {isValidStandard ? null : <div className='invalid-feedback'>class Must be in correct range </div>}
                </div>
              </Col>
              <Col sm={6}>
                {/* subject  */}
                <div className="form-group">
                  <label htmlFor="subject"> Subject*</label>
                  <select
                    name="subject"
                    placeholder="Enter subject"
                    className={`form-control ${isValidSubject ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                    required
                  >  <option value="">choose subject for help </option>
                    <option value="PHYSICS">PHYSICS</option>
                    <option value="CHEMESTRY">CHEMESTRY</option>
                    <option value="MATHS">MATHS</option>
                    <option value="BIOLOGY">BIOLOGY</option>
                    <option value="PCM">PCM</option>
                    <option value="PCB">PCB</option>
                  </select>
                  {/*feedback here*/}
                  {isValidSubject ? null : <div className='invalid-feedback'>choose from given</div>}
                </div>
              </Col>
            </Row>







            {/* Input coaching */}
            <div className="form-group">
              <label htmlFor="coaching">Your Coaching*</label>
              <input
                name="coaching"
                type="text"
                placeholder="Enter coaching"
                className={`form-control ${isValidCoaching ? '' : 'is-invalid'}`}
                onChange={this.handleChange}
                required
              />
              {/*feedback here*/}
              {isValidCoaching ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
            </div>

            {/* Select category */}
            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <select
                name="category"
                placeholder="Enter category"
                className={`form-control ${isValidCategory ? '' : 'is-invalid'}`}
                onChange={this.handleChange}
                required
              > <option value="">Choose Field</option>
                <option value="JEE">JEE</option>
                <option value="NEET">NEET</option>
                <option value="CAREER">CAREER</option>
                <option value="DEVELOPMENT">DEVELOPMENT</option>
              </select>
              {/*feedback here*/}
              {isValidCategory ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
            </div>

            {/* Submit button */}
            <div className="form-group">
              <button type="submit" className="btn btn-info btn-block">
                Submit
              </button>
            </div>

          </form>

        </Container>
      </Fragment>
    )
  }
}

export default MenteeCreateForm;
