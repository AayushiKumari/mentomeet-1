import React, { Fragment } from 'react';
//import ImageUploader from 'react-images-upload';

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
        if (value.trim().length > 100||value.trim().length<1) {
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
          if (value<0||value>13||value.trim().length<1) {
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

  makePostRequest = (data) => {
    const endpoint = `http://${window.location.hostname}:5005/mentee`;
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
        if(response.status!== 401 && response.status !== 400 ){
                   
          if(response) { 
          alert("Good job!  Successfully added as a mentee")
          console.log("Response came", response.text());} 
          //  window.location.href="/"
//catch bad request
          }
      else { console.log(response.text());alert(":(' please check your inputs") }    
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
    const allAreValid = isValidSubject  & isValidCoaching & isValidStandard & isValidCategory ;
    
    if (allAreValid) {
      // Now this means all are valid field
      // We are good to go and make a post request
      var reqBody = {};
      reqBody['subject'] = subject;
      reqBody['coaching'] = coaching;
      reqBody['standard'] = standard;
      reqBody['category'] = category;
    //  reqBody['language'] = ['English'];

      this.makePostRequest(reqBody);

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
        <form
          id="create-mentor-form"
          onSubmit={this.handleSubmit}
        >
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
          <button type="submit" className="btn btn-success btn-block">
            Submit
          </button>
        </form>
      </Fragment>
    )
  }
}

export default MenteeCreateForm;
