import React, { Fragment } from 'react';
// import ImageUploader from 'react-images-upload';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, InputGroupText,  InputGroupAddon, InputGroup} from 'reactstrap';
import Axios from "axios"

import {checktoken} from "../CommonFunc/common.js"

const required = (val) => val && val.length;

class BlogCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      text: '',
    }

    this.handleChangeEditor = this.handleChangeEditor.bind(this)
    //this.onDrop = this.onDrop.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    checktoken();
  }

  handleChangeEditor(value) {
    this.setState({ text: value })
  }

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
 
  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

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

  onFileChangeHandler = (e) => {
    this.setState({
        selectedFile: e.target.files[0]
    })
  }
                
  handleSubmit = (values) => {
    // console.log(values)
    // console.log("SelectedFile is ");
    // console.log(this.state.selectedFile)
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append("author", localStorage.getItem('user'));
    formData.append("title", values.title);
    formData.append("body_text", values.body_text);
    formData.append("file", this.state.selectedFile);
    formData.append("category", (values.category).toUpperCase());
    formData.append("tag", values.tag);
    formData.append("minute_read", values.minute_read);
    console.log(formData);

    
    console.log("token is " + `Bearer ${token}`)
    
    Axios.post(`http://${window.location.hostname}:5005/blog`, formData, {
        headers: {
            'Authorization': `Bearer ${token}` 
        } 
    }).then(result => {
        console.log(result)
        window.location.reload()
    }).catch(error => {
        console.log("axios error")
        console.log(error)
    })
    
}

  render() {

    return (
      <Fragment>
        <div className="container">

            <LocalForm id="create-mentor-form" onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                    <Col md={12}>
                        <Control.text model=".title"
                            id="title"
                            name="title"
                            placeholder="Title"
                            className="form-control"
                            validators={{
                                required
                            }}
                        />
                        <Errors
                            className="text-danger"
                            show="touched"
                            model=".title"
                            messages={{
                                required: 'This is a Required Field!'
                            }}
                        />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={12}>
                        <Control.textarea model=".body_text"
                            id="body_text"
                            name="body_text"
                            rows="10"
                            placeholder="Body Content"
                            className="form-control"
                            validators={{
                                required
                            }}
                        />
                        <Errors
                            className="text-danger"
                            show="touched"
                            model=".body_text"
                            messages={{
                                required: 'This is a Required Field!'
                            }}
                        />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={12}>
                        <Control.file model=".file"
                            id="file"
                            name="file"
                            accept="image/*"
                            className="form-controls"
                            onChange={this.onFileChangeHandler}
                        />
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={12}>
                        <Control.select
                            model=".category"
                            id="category"
                            name="category"
                            className="custom-select"
                            validators={{
                                required
                            }}                                                
                        >
                            <option value="">Categories..</option>
                            <option value="JEE">JEE</option>
                            <option value="NEET">NEET</option>
                            <option value="CAREER">CAREER</option>
                            <option value="DEVELOPMENT">DEVELOPMENT</option>
                        </Control.select>
                        <Errors
                            className="text-danger"
                            show="touched"
                            model=".category"
                            messages={{
                                required: 'This is a Required Field!'
                            }}
                        />
                        
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={12}>
                        <Control.select
                            model=".tag"
                            id="tag"
                            name="tag"
                            className="custom-select"
                            validators={{
                                required
                            }}                                                
                        >
                            <option value="">Choose Tag...</option>
                            <option value="PHYSICS">PHYSICS</option>
                            <option value="CHEMESTRY">CHEMESTRY</option>
                            <option value="MATHS">MATHS</option>
                            <option value="BIOLOGY">BIOLOGY</option>
                            <option value="PCM">PCM</option>
                            <option value="PCB">PCB</option>
                            <option value="JEE-EXAM">JEE-EXAM</option>
                            <option value="NEET-EXAM">NEET-EXAM</option>
                            <option value="DEV-BLOG">DEV-BLOG</option>
                        </Control.select>
                        <Errors
                            className="text-danger"
                            show="touched"
                            model=".tag"
                            messages={{
                                required: 'This is a Required Field!'
                            }}
                        />
                        
                    </Col>
                </Row>
                <Row className="form-group">
                    <Col md={12}>
                        <Control.text model=".minute_read"
                            id="minute_read"
                            type="number"
                            name="minute_read"
                            placeholder="Minute read between 0 to 60 mins"
                            className="form-control"
                            validators={{
                                required
                            }}
                        />
                        <Errors
                            className="text-danger"
                            show="touched"
                            model=".minute_read"
                            messages={{
                                required: 'This is a Required Field!'
                            }}
                        />
                    </Col>
                </Row>
                

                <Row className="form-group">
                    <Col md={{ size: 12 }}>
                        <Button type="submit" block color="info">
                            Submit
                    </Button>
                    </Col>
                </Row>

            </LocalForm>
     
        </div>
        
      </Fragment>
    )
  }
}

export default BlogCreateForm;
