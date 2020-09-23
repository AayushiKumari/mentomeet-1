import React, { Fragment } from 'react';
import ImageUploader from 'react-images-upload';
import $ from 'jquery' 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Axios from 'axios';

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

        var isValid = true;
        if (value.trim().length > 13) {
          isValid = false;
        }
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
            window.location.href="/profile"
          }
          //   

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
      const formData = new FormData();
      formData.append("about_me", this.state.about_me.value);
      formData.append("fb_link", fb_link);
      formData.append("linkedin_link", linkedin_link);
      formData.append("file", profile_picture);
      formData.append("category", category);
      formData.append("expertise", expertise);
      formData.append("branch", branch);
      formData.append("start_time", start_time);
      formData.append("end_time", end_time);
      formData.append("college", college);
      formData.append("year", year);
      formData.append("rank", rank);
      formData.append("college_type", college_type);
      console.log(formData);

      // reqBody['about_me']=this.state.about_me.value
      // reqBody['profile_picture'] = profile_picture;
      // reqBody['fb_link'] = fb_link;
      // reqBody['linkedin_link'] = linkedin_link;
      // reqBody['expertise'] = expertise;
      // reqBody['branch'] = branch;
      // reqBody['start_time'] = start_time;
      // reqBody['end_time'] = end_time;
      // reqBody['college'] = college;
      // reqBody['year'] = year;
      // reqBody['college_type'] = college_type;
      // reqBody['rank'] = rank;
      // reqBody['category'] = category;
      const userId=JSON.parse(localStorage.getItem('user'))._id
      // this.makePostRequest(reqBody,userId);
      // const endpoint = `http://${window.location.hostname}:5005/mentor/${userId}`;
    // CSRF Token if needed


    Axios.put(`http://${window.location.hostname}:5005/mentor/${userId}`, formData).then(response => {
      if (response.status !== 401 && response.status !== 400) {

        if (response) {
          alert("Good job!  once verified you will be added as mentor")
          // console.log("Response came", response.text());
          window.location.href="/profile"
        }
        //   

      }
      else { console.log(response.text()); alert(":(' please check your inputs") }
      // window.location.href= '/mentors/'+response.text()._id
    })
    .catch(error => {
      console.log("Error in makePostRequest", error);
      alert("An error occured, please try again");
    });

    // let lookupOptions = {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // }

    // fetch(endpoint, lookupOptions)
    //   .then(response => {
    //     if (response.status !== 401 && response.status !== 400) {

    //       if (response) {
    //         alert("Good job!  Successfully added as a mentor")
    //         console.log("Response came", response.text());
    //         window.location.href="/profile"
    //       }
    //       //   

    //     }
    //     else { console.log(response.text()); alert(":(' please check your inputs") }
    //     // window.location.href= '/mentors/'+response.text()._id
    //   })
    //   .catch(error => {
    //     console.log("Error in makePostRequest", error);
    //     alert("An error occured, please try again");
    //   });

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

          const profile_picture = result.history[0].profile_picture;
          // const fullName = result.firstName+" "+result.lastName;
          // const email = result.email;          
          const branch = result.history[0].branch;
          const year = result.history[0].year;
          const category = result.history[0].category;
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
              //mentee specific
              branch:{value:branch,valid:true},year:{value:year,valid:true},
              college:{value:college,valid:true},college_type:{value:college_type,valid:true},
              rank:{value:rank,valid:true},expertise:{value:expertise,valid:true},
              start_time:{value:start_time,valid:true},end_time:{value:end_time,valid:true},
              fb_link:{value:fb_link,valid:true},linkedin_link:{value:linkedin_link,valid:true},
              about_me:{value:about_me,valid:true},
              category:{value:category,valid:true},
            
          });
          $(document).ready(function() { 
            $('#branch').val(branch);
            $('#college_type').val(college_type);
            $('#college').val(college);
            $('#year').val(year);
            $('#expertise').val(expertise);
            $('#rank').val(rank);
            $('#start_time').val(start_time);
            $('#end_time').val(end_time);
            $('#fb_link').val(fb_link);
            $('#linkedin_link').val(linkedin_link);
            $('#about_me').val(about_me);
           $('#category').val(category);
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

    // match.params.id - The user Id for other users
    // If the id does not exist this means open the current user profile
    if(localStorage.getItem('user')){
      //const Role=   JSON.parse(localStorage.getItem('user')).role
      const uId = JSON.parse(localStorage.getItem('user'))._id;
      console.log("My User Id", uId)
      this.updateProfileData(uId);
    }
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
        <Container style={{paddingTop:"100px"}}>
          {/* <h3 style={{ textAlign: "center", margin: "12px 0" }}>Register as Mentee</h3> */}
          <Card>
            <Card.Header style={{textAlign:"center"}}>You are registered as Mentor..</Card.Header>
            <Card.Body>
            <form
              id="create-mentor-form"
              onSubmit={this.handleSubmit}
            >

            {/* Input body image */}
            <div className="form-group">
              <label htmlFor="profile_picture">Upload Profile picture* (size must be less than 300kb) </label><br />
              <input
              id="profile_picture"
                name="profile_picture"
                type="file"
                placeholder="Image size must be <300kb and square for best look"
                required
                onChange={this.onFileChangeHandler}
              />
            </div>


            <div className="row">
              <div className="col-md-6">

                {/* Select Year */}
                <div className="form-group">
                  <label htmlFor="year">Year*</label>
                  <select
                  id="year"
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
              <div className="col-md-6">

                {/* Input Branch */}
                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <input
                  id="branch"
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
              id="college"
                name="college"
                type="text"
                placeholder="College name should less than 13 characters*"
                className={`form-control ${isValidCollege ? '' : 'is-invalid'}`}
                onChange={this.handleChange}
                required
              />
              {/*feedback here*/}
              {isValidCollege ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
            </div>


            <div className="row">
              <div className="col-md-4">
                {/* Input CollegeType */}
                <div className="form-group">
                  <label htmlFor="college-type">College Type*</label>
                  <select
                  id="college_type"
                    name="college_type"
                    placeholder="Enter college type*"
                    className={`form-control ${isValidCollegeType ? '' : 'is-invalid'}`}
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
              <div className="col-md-4">
                {/* Select college */}
                <div className="form-group">
                  <label htmlFor="category">Category*</label>
                  <select
                  id="category"
                    name="category"
                    placeholder="Enter Category*"
                    className={`form-control ${isValidCategory ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                  >
                    <option value="JEE">JEE</option>
                    <option selected value="NEET">NEET</option>
                    <option value="CAREER">CAREER</option>
                    <option value="DEVELOPMENT">DEVELOPMENT</option>
                  </select>
                  {/*feedback here*/}
                  {isValidCategory ? null : <div className='invalid-feedback'>Must be Proper</div>}
                </div>


              </div>
              <div className="col-md-4">
                {/* Input Rank */}
                <div className="form-group">
                  <label htmlFor="rank">Rank</label>
                  <input
                  id="rank"
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
              <Row>
                <div className="col-md-5">
                  <label htmlFor="start_time">Start time* </label>
                  <input
                    id="start_time"
                    name="start_time"
                    type="time"
                    defaultValue="00:00"
                    className={`form-control`}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="col-md-5">
                  <label htmlFor="end_time">End time* </label>
                  <input
                    id="end_time"
                    name="end_time"
                    type="time"
                    defaultValue="00:00"
                    className={`form-control`}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </Row>

            </div>


            {/* expertise  */}
            <div className="form-group">
              <label htmlFor="expertise">Choose Expertise</label>
              <select
              id="expertise"
                name="expertise"
                placeholder="Enter expertise"
                className={`form-control ${isValidExpertise ? '' : 'is-invalid'}`}
                onChange={this.handleChange}
                required
              >
                <option selected value="PHYSICS">PHYSICS</option>
                <option value="CHEMISTRY">CHEMISTRY</option>
                <option value="MATHS">MATHS</option>
                <option value="BIOLOGY">BIOLOGY</option>
                <option value="PCM">PCM</option>
                <option value="PCB">PCB</option>
              </select>
              {/*feedback here*/}
              {isValidExpertise ? null : <div className='invalid-feedback'>choose from given</div>}
            </div>

            {/* AboutMe  */}
            {/* <div className="col-md-6">
              <div className="form-group">
              <label htmlFor="about_me">Your Descriptions/achievements: </label>
                <input
                  id="branch"
                  name="branch"
                  type="text"
                  placeholder="Enter branch"
                  className={`form-control`}
                  onChange={this.handleChange}
                />
              </div>
            </div> */}

            <div className="form-group">
              <label htmlFor="about_me">Your Descriptions/achievements: </label>
              <textarea
              id="about_me"
                name="about_me"
                // type="textarea"
                placeholder="Your Descriptions"
                className={`form-control`}
                onChange={this.handleChange}
                rows={4}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                {/* fb  Name */}
                <div className="form-group">
                  <label htmlFor="fb_link">FB Profile</label>
                  <input
                  id="fb_link"
                    name="fb_link"
                    placeholder="Enter FB Link"
                    className={`form-control ${isValidFbLink ? '' : 'is-invalid'}`}
                    onChange={this.handleChange}
                  />
                  {/*feedback here*/}
                  {isValidFbLink ? null : <div className='invalid-feedback'>invalid url</div>}
                </div>
              </div>
              <div className="col-md-6">
                {/* linkedin_link Name */}
                <div className="form-group">
                  <label htmlFor="linkedin_link">Linkedin Profile</label>
                  <input
                  id="linkedin_link"
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
            </Card.Body>
          </Card>

        </Container>
      </Fragment>
    )
  }
}

export default MentorCreateForm;
