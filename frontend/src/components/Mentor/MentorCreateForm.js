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
      }
    }

    // Binding to class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  handleImageChange(event) {
    console.log(event.target.files[0])
    this.setState({
      profile_picture: event.target.files[0],
      loaded: 0,
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
        //var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (value.trim().length > 200) {
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

        // Now check for all the required checks
        var isValid = true;
        // var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (value.trim().length > 200) {
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
          about_me: {
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
    }
  }

  makePostRequest = (data) => {
    const endpoint = `http://${window.location.hostname}:5005/mentor`;
    // CSRF Token if needed

    let lookupOptions = {
      method: "POST",
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
    console.log("Handling form submit");

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

      this.makePostRequest(reqBody);

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
                onChange={this.handleImageChange}
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
                    placeholder="Enter branch"
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
              <div class="col-sm-6 d-flex align-items-center justify-content-center">
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

            <div className="row">
              <div className="col-sm-6">
                {/* fb  Name */}
                <div className="form-group">
                  <label htmlFor="fb_link">FB Prfile</label>
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
