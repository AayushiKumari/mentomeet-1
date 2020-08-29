import React, { Component, Suspense } from "react"
import $ from "jquery"
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, InputGroupText,  InputGroupAddon, InputGroup} from 'reactstrap';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Navbar from './../NavBar.js'


import AllQuestion from "./AllQuestion"
import VotedAns from "./VotedAns"
import UnAnswered from "./UnAnswered"

import Routes from "../../Routes"
import Axios from "axios"


const required = (val) => val && val.length;
const validUrl = (val) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(val);


class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: "",
            category: "JEE",
            selectedFile: null,
            tags: [],
            question: []
        }
    }

    componentDidMount() {

        $(".custom-file-input").on("change", function () {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });

    }

    onChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    onFileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    AddTag = (e) => {
        e.preventDefault();
        let val = document.getElementById("tag").value;
        if (val != "") {
            let modTag = this.state.tags;
            modTag.push(val);
            this.setState({
                tags: modTag
            })
            console.log(modTag)
            document.getElementById("tag").value = "";
        }

    }

    handleSubmit = (values) => {
        console.log(values)
        console.log("SelectedFile is ");
        console.log(this.state.selectedFile)

        const formData = new FormData();
        formData.append("question", values.question);
        formData.append("file", this.state.selectedFile);
        formData.append("category", values.category);
        formData.append("tags", this.state.tags);
        console.log(formData);

        Axios.post("http://localhost:5005/quora/question/5f3a6c1ec944801a08a6b2f1", formData).then(result => {
            console.log(result)
            window.location.reload()
        }).catch(error => {
            console.log("axios error")
            console.log(error)
        })
        debugger;
    }


    render() {
        return (
            <>
            <Navbar />
            <div className="my-4">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-md-8">
                            <div>
                                <div className="d-flex justify-content-between mb-3 d-md-none">
                                    <button type="button" className="btn btn-info " data-toggle="modal" data-target="#questionModal">Ask Question</button>
                                    <div class="">
                                        <select class="custom-select" id="inputGroupSelect01">
                                            <option selected>Categories...</option>
                                            <option value="1">JEE</option>
                                            <option value="2">NEET</option>
                                            <option value="3">Others</option>
                                        </select>
                                    </div>
                                </div>
                                <nav>
                                    <div className="nav-tabs-question d-flex justify-content-between">
                                        <div className="nav nav-tabs " id="nav-tab" role="tablist">
                                            <Link to="/qna" className={"nav-item text-dark py-1 border-0 nav-link " + (window.location.pathname === '/qna' ? 'active' : '')} id="nav-home-tab">All</Link>
                                            <Link to="/qna/votes" className={"nav-item text-dark py-1 border-0 nav-link " + (window.location.pathname === '/qna/votes' ? 'active' : '')} id="nav-profile-tab" >Votes</Link>
                                            <Link to="/qna/unanswered" className={"nav-item text-dark py-1 border-0 nav-link " + (window.location.pathname === '/qna/unanswered' ? 'active' : '')} id="nav-contact-tab">UnAnswered</Link>

                                        </div>
                                        <div class="d-none d-md-block">
                                            <select class="custom-select border-0 rounded-0 bg-warning text-white" id="inputGroupSelect01">
                                                <option selected>Categories...</option>
                                                <option value="1">JEE</option>
                                                <option value="2">NEET</option>
                                                <option value="3">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="tab-content" id="nav-tabContent">
                                        <Suspense>
                                            <Switch>
                                                {Routes.map((route, index) => {
                                                    return route.component ? (
                                                        <Route
                                                            key={index}
                                                            path={route.path}
                                                            exact={route.exact}
                                                            name={route.name}
                                                            render={props => <route.component {...props} />}
                                                        />
                                                    ) : (null);
                                                })}
                                                <Redirect from="/" to="/index" />
                                            </Switch>
                                        </Suspense>
                                    </div>
                                </nav>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <div>
                                    <button type="button" className="btn btn-info d-none d-md-block w-100" data-toggle="modal" data-target="#questionModal">ASK QUESTION</button>
                                </div>

                                <div className="card my-2">
                                    <div className="card-body pb-0">
                                        <h5 className="card-title text-warning pb-2 border-bottom">Stats</h5>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">Question (25)</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">Answers (40)</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">Best Answers (5)</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">Tags (5)</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card my-2">
                                    <div className="card-body pb-2">
                                        <h5 className="card-title text-warning pb-2 border-bottom">Hot Questions</h5>
                                        <div>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How much do web developers earn? What is their salary?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">Does Google force employees who have offers from Facebook to leave immediately?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How to evaluate whether a career coach is beneficial?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">Why are the British confused about us calling bread rolls “biscuits” when they call bread rolls “puddings”?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How do I tell my new employer that I can’t use the computer they gave me?</a>
                                            </h6>
                                            <h6 className="small font-weight-bold mb-3">
                                                <a href="#" className="text-decoration-none">How to evaluate whether a career coach is beneficial?</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="questionModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header py-2">
                                <h6 class="modal-title" id="exampleModalLabel">Ask A Question</h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">


                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Col md={12}>
                                            <Control.textarea model=".question"
                                                id="question"
                                                name="question"
                                                rows="3"
                                                placeholder="Ask a Question..."
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                show="touched"
                                                model=".question"
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
                                            >
                                                <option value="-1">Categories..</option>
                                                <option value="JEE">JEE</option>
                                                <option value="NEET">NEET</option>
                                                <option value="Others">Others</option>
                                            </Control.select>
                                            
                                        </Col>
                                    </Row>
                                    {this.state.tags.length>0?  //ternary
                                    <div className="card mb-3">
                                    <div className="card-body text-center p-2">
                                        {this.state.tags.map((tag, index)=>{
                                            return(
                                                    <a href="#" class="badge badge-warning mr-2">{tag.toUpperCase()}</a>
                                                )
                                            })}
                                        </div>
                                    </div>:""
                                    }
                                    <Row>
                                        <Col >
                                            <InputGroup className="mb-3">                                            
                                                <Control.text  model=".tag"
                                                    id="tag"
                                                    name="tag"
                                                    placeholder="Add Tags"
                                                    className="form-control col-md-12"
                                                    
                                                />
                                                <InputGroupAddon addonType="append"><Button onClick={this.AddTag}>Add</Button></InputGroupAddon>
                                                
                                            </InputGroup>

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




                                {/* <form onSubmit={(values) => this.handleSubmit(values)}>
                                    <div class="form-group">
                                        <textarea class="form-control" id="question" name="question" rows="3" placeholder="Ask Your Question" onChange={this.onChangeHandler} required></textarea>
                                    </div>
                                    <div class="custom-file mb-3">
                                        <input type="file" class="custom-file-input" id="file" name="file" onChange={this.onFileChangeHandler}/>
                                        <label class="custom-file-label" for="file">Choose file</label>
                                    </div>
                                    <div class="form-group">
                                        <select class="custom-select" id="inputGroupSelect01" name="category" onChange={this.onChangeHandler} required>
                                            <option value="JEE">JEE</option>
                                            <option value="NEET">NEET</option>
                                            <option value="Others">Others</option>
                                        </select>
                                    </div>

                                    {this.state.tags.length>0?  //ternary
                                    <div className="card mb-3">
                                    <div className="card-body text-center p-2">
                                        {this.state.tags.map((tag, index)=>{
                                            return(
                                                    <a href="#" class="badge badge-warning mr-2">{tag.toUpperCase()}</a>
                                                )
                                            })}
                                        </div>
                                    </div>:""
                                    }
                                    
                                    <div class="input-group mb-3">
                                        <input type="text" class="form-control" id="tag" placeholder="Add Tags" />
                                        <div class="input-group-append">
                                            <button class="btn btn-info" onClick={this.AddTag} type="button">ADD</button>
                                        </div>
                                    </div>
                                    <div className="my-3 text-center">
                                        <button type="submit" class="btn btn-primary w-100">Submit Question</button>
                                    </div>
                                </form> */}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Question;