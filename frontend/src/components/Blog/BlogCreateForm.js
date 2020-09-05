import React, { Fragment } from 'react';
import ImageUploader from 'react-images-upload';

class BlogCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
            value: '',
            valid: true
          },  
      body_image: null,
      body_text: {
        value: '',
        valid: true
      },      
      category: {
        value: 'JEE',
        valid: true
      },
       minute_read: {
        value: '',
        valid: true
      },
      tag: {
        value: '',
        valid: true
      },  
    }

    //this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange=this.handleImageChange.bind(this);
  }

  // onDrop(pictureFiles, pictureDataURLs) {
  //   this.setState({
  //     body_image: this.state.body_image.concat(pictureFiles)
  //   });
  //   // Binding to class
    
  handleImageChange(event){
    console.log(event.target.files[0])
    this.setState({
      body_image: event.target.files[0],
      loaded: 0,
    })
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    console.log("Handle Change Event", name, value);

    switch (name) {
        case 'title':

        // Check if title is valid or not
        var isValid = true;
        if (value.trim().length > 100||value.trim().length<1) {
          isValid = false;
        }

        this.setState({
          title: {
            value: value,
            valid: isValid
          }
        });
        break;

      case 'tag':

        // Check if tag is valid or not
        var isValid = true;
        if (value.trim().length > 100||value.trim().length<1) {
          isValid = false;
        }

        this.setState({
          tag: {
            value: value,
            valid: isValid
          }
        });
        break;

      case 'body_text':
        var isValid = true;
        if (value.trim().length > 100000000 &&value.trim().length < 10) {
          isValid = false;
        }
        var isValid = true;
        this.setState({
          body_text: {
            value: value,
            valid: isValid
          }
        })
        break;

      case 'minute_read':

        var isValid = true;
          if (Number.isInteger(value)&&value>0&&value<60||value.trim().length<1) {
            isValid = false;
          }
        this.setState({
          minute_read: {
            value: value,
            valid: isValid
          }
        })
        break;

      case 'category':
        var isValid = true;
        if (value.trim().length > 100||value.trim().length<1) {
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
    const endpoint = `http://${window.location.hostname}:5005/blog`;
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
          alert("Good job!  Successfully added a blog")
          console.log("Response came", response.text());} 
         //   window.location.href="/"
     }
          else { console.log(response.text());alert(":(' please check your inputs") } 
      }
            )
      .catch(error => {
        console.log("Error in makePostRequest", error);
        alert("An error occured, please try again");
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Handling form submit");
    console.log(this.state.body_image);
    // Here we will also check if he has filled all or not
    // Here we will also finally check that all number entries are numbers
    
    const body_image = this.state.body_image;//image

    const tag = this.state.tag.value;
    const isValidtag = this.state.tag.valid;
    const title = this.state.title.value;
    const isValidtitle = this.state.title.valid;
    const body_text = this.state.body_text.value;
    const isValidbody_text = this.state.body_text.valid;
    const minute_read = this.state.minute_read.value;
    const isValidminute_read = this.state.minute_read.valid;
    const category = this.state.category.value;
    const isValidCategory = this.state.category.valid;
    const allAreValid =  isValidtag  &isValidtitle& isValidbody_text & isValidminute_read & isValidCategory ;
    
    if (allAreValid) {
      // Now this means all are valid field
      // We are good to go and make a post request
      var reqBody = {};
      reqBody['title'] = title;
      reqBody['tag'] = tag;
      reqBody['body_text'] = body_text;
      reqBody['minute_read'] = minute_read;
      reqBody['category'] = category;
     reqBody['file'] = body_image;//not working 

      this.makePostRequest(reqBody);

    } else {
      alert('Check all fields are valid');
    }

    // Here we will make the post request

    // Also perform some checcks like phone is a number or not
  }

  render() {
    const isValidtitle = this.state.title.valid;
    const isValidtag = this.state.tag.valid;
    const isValidbody_text = this.state.body_text.valid;
    const isValidminute_read = this.state.minute_read.valid;
    const isValidCategory = this.state.category.valid;

    return (
      <Fragment>
        <form
          id="create-mentor-form"
          onSubmit={this.handleSubmit}
        >

         

          {}
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              name="title"
              type="text"
              placeholder="Enter Title"
              className={`form-control ${isValidtitle ? '' : 'is-invalid'}`}
              onChange={this.handleChange}
            />
            {}
            {isValidtitle ? null : <div className='invalid-feedback'>Must be a valid Title </div>}
          </div>

          {/* Input body_text */}
          <div className="form-group">
            <label htmlFor="body_text">Your body text*</label>
            <textarea
              name="body_text"
              rows={10} cols={10}
              placeholder="Enter body_text"
              className={`form-control ${isValidbody_text ? '' : 'is-invalid'}`}
              onChange={this.handleChange}
              required
            />
            {/*feedback here*/}
            {isValidbody_text ? null : <div className='invalid-feedback'>need to add atleast 10 characters </div>}
          </div>
          {/* Input body image */}
          <div className="form-group">
            <label htmlFor="body_image">Any body image</label><br/>
            <input
              name="body_image"
              type="file"
              placeholder="Select image"
              onChange={this.handleImageChange}
            />
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
            ><option value="">Choose Category</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
              <option value="CAREER">CAREER</option>
              <option value="DEVELOPMENT">DEVELOPMENT</option>
            </select>
            {/*feedback here*/}
            {isValidCategory ? null : <div className='invalid-feedback'>Must be less than 100 characters</div>}
          </div>
           {/* tag  */}
           <div className="form-group">
            <label htmlFor="tag">Tag*</label>
            <select
              name="tag"
              placeholder="Enter tag"
              className={`form-control ${isValidtag ? '' : 'is-invalid'}`}
              onChange={this.handleChange}
              required
            > <option value="">Choose Tag</option>
              <option value="PHYSICS">PHYSICS</option>
              <option value="CHEMESTRY">CHEMESTRY</option>
              <option value="MATHS">MATHS</option>
              <option value="BIOLOGY">BIOLOGY</option>
              <option value="PCM">PCM</option>
              <option value="PCB">PCB</option>
              <option value="JEE-EXAM">JEE-EXAM</option>
              <option value="NEET-EXAM">NEET-EXAM</option>
              <option value="DEV-BLOG">DEV-BLOG</option>
              
            </select>
            {/*feedback here*/}
            {isValidtag ? null : <div className='invalid-feedback'>choose from given</div>}
          </div>
         {/* Select minute_read */}
         <div className="form-group">
            <label htmlFor="minute_read">Minute_read*</label>
            <input
              name="minute_read"
              type="number"
              placeholder="Enter minute_read"
              className={`form-control ${isValidminute_read ? '' : 'is-invalid'}`}
              onChange={this.handleChange}
              required
            />
              
            {/*feedback here*/}
            {isValidminute_read ? null : <div className='invalid-feedback'>Must be less than 60 </div>}
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

export default BlogCreateForm;
