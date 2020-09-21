import React, { Fragment } from 'react';
//import ImageUploader from 'react-images-upload';
import $ from 'jquery' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Axios from 'axios'


class MenteeCreateForm extends React.Component {
  constructor(props) {
    super(props);
    // this.onDrop = this.onDrop.bind(this);
    this.state = {
      profile_picture: null,
      profile_picture_url:null,
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
      },isLoaded:false,error:null
      
    }

    // Binding to class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

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
    console.log(data)
    const formData = new FormData();
    formData.append("file", this.state.profile_picture);
    formData.append("category", data.category);
    formData.append("coaching", data.coaching);
    formData.append("standard", data.standard);
    formData.append("subject", data.subject);

    // let lookupOptions = {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   data: formData
    // }

    Axios.put(endpoint, formData)
      .then(response => {
        if (response.status !== 401 && response.status !== 400) {

          if (response) {
            alert("Good job!  Successfully added as a mentee")
            console.log("Response came", response.data);
            window.location.href="/profile"
          }
          //  
          //catch bad request
        }
        else { 
          alert(":(' please check your inputs") 
        }
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
  updateProfileData = (userId) => {
    console.log("Fetch user data for userId", userId);
   // if(Role ==='Mentor'){
    const endpoint = `http://${window.location.hostname}:5005/profile/${userId}`;  
    fetch(endpoint)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Response data of mentors came", result);
       
         if(result.history.length>0){

            const standard = result.history[0].standard;
            const coaching = result.history[0].coaching;
            const category = result.history[0].category;
            const subject = result.history[0].subject;
            this.setState({
              //mentee specific
              standard:{value:standard,valid:true},coaching:{value:coaching,valid:true},
              category:{value:category,valid:true},subject:{value:subject,valid:true},
              profile_picture_url: result.history[0].profile_picture
            
          });
          $(document).ready(function() { 
            $('#standard').val(standard);
            $('#subject').val(subject);
            $('#category').val(category);
            $('#coaching').val(coaching);
          });
          
         }
        //  const fullName = result.firstName+" "+result.lastName;
        //   const email = result.email;   
          
         

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
    console.log("Component did mount in menteeProfile");

    // match.params.id - The user Id for other users
    // If the id does not exist this means open the current user profile
    if(localStorage.getItem('user')){
      //const Role=   JSON.parse(localStorage.getItem('user')).role
      const uId = JSON.parse(localStorage.getItem('user'))._id;
      console.log("My User Id", uId)
      this.updateProfileData(uId);
    }
   }

   onFileChangeHandler = (e) => {
    this.setState({
        profile_picture_url: URL.createObjectURL(e.target.files[0]),
        profile_picture: e.target.files[0]
    })
  }
  render() {

    const isValidSubject = this.state.subject.valid;
    const isValidCoaching = this.state.coaching.valid;
    const isValidStandard = this.state.standard.valid;
    const isValidCategory = this.state.category.valid;

    return (
      <Fragment>
        <Container style={{paddingTop:"100px"}}>
          {/* <h3 style={{ textAlign: "center", margin: "12px 0" }}>Register as Mentee</h3> */}
          <Card>
            <Card.Header style={{textAlign:"center"}}>You are registered as Mentee..</Card.Header>
            <Card.Body>
            <form
              id="create-mentor-form"
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col md={6} className="d-flex justify-content-center align-self-center">
                  <Card.Img variant="top" style={{borderRadius:"50%", height:"100px", width:"100px"}} src={this.state.profile_picture_url===null ? require('./../../assets/default-avatar.png') : (this.state.profile_picture_url)} />
                </Col>
                <Col md={6} className="d-flex justify-content-center align-self-center">
                    <div className="form-group">
                      <label htmlFor="profile_picture">Upload Profile picture</label><br />
                      <input
                        id="profile_picture"
                        name="profile_picture"
                        type="file"
                        placeholder="Select image"
                        onChange={this.onFileChangeHandler}
                      />
                    </div>
                </Col>
              </Row>
              
              <Row>
                <Col sm={6}>
                  {/* Select class */}
                  <div className="form-group">
                    <label htmlFor="standard">Class/Year</label>
                    <input
                    id="standard"
                      name="standard"
                      type="number"
                      placeholder="Enter Class/year "
                      className={`form-control ${isValidStandard ? '' : 'is-invalid'}`}
                      onChange={this.handleChange}
                      value={this.state.standard.value}
                      required
                    />

                    {/*feedback here*/}
                    {isValidStandard ? null : <div className='invalid-feedback'>Requried, class Must be in correct range </div>}
                  </div>
                </Col>
                <Col sm={6}>
                  {/* subject  */}
                  <div className="form-group">
                    <label htmlFor="subject"> Subject</label>
                    <select
                    id="subject"
                      name="subject"
                      placeholder="Enter subject"
                      className={`form-control ${isValidSubject ? '' : 'is-invalid'}`}
                      onChange={this.handleChange}
                      required
                    >  <option value="">choose subject for help </option>
                      <option value="PHYSICS">PHYSICS</option>
                      <option value="CHEMISTRY">CHEMISTRY</option>
                      <option value="MATHS">MATHS</option>
                      <option value="BIOLOGY">BIOLOGY</option>
                      <option value="PCM">PCM</option>
                      <option value="PCB">PCB</option>
                    </select>
                    {/*feedback here*/}
                    {isValidSubject ? null : <div className='invalid-feedback'>Requried, choose from given</div>}
                  </div>
                </Col>
              </Row>
              {/* Input coaching */}
              <div className="form-group">
                <label htmlFor="coaching">Your Coaching</label>
                <input
                id="coaching"
                  name="coaching"
                  type="text"
                  placeholder="Enter coaching"
                  className={`form-control ${isValidCoaching ? '' : 'is-invalid'}`}
                  onChange={this.handleChange}
                  required
                />
                {/*feedback here*/}
                {isValidCoaching ? null : <div className='invalid-feedback'>Requried, Must be less than 100 characters</div>}
              </div>

              {/* Select category */}
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                id="category"
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
                {isValidCategory ? null : <div className='invalid-feedback'>Requried, Must be less than 100 characters</div>}
              </div>

              {/* Submit button */}
              <div className="form-group">
                <button type="submit" className="btn btn-info btn-block">
                  Submit
                </button>
              </div>

            </form>
            </Card.Body>
          </Card>

        </Container>
      </Fragment>
    )
  }
}

export default MenteeCreateForm;
