import React, { Component, Suspense } from "react"
import Axios from 'axios'
import $ from "jquery"
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, InputGroupText,  InputGroupAddon, InputGroup, Card, CardBody, CardTitle, Alert} from 'reactstrap';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

// import NavBarLog from './../NavBarLog.js'
import Routes from "./MentorRoutes.js"
import { CardHeader } from "@material-ui/core";
// import BlogCreateForm from "./BlogCreateForm"




// import EachQuestion from "./EachQuestion"
// import {checktoken} from "../CommonFunc/common.js"

const required = (val) => val && val.length;



class MentorLists extends Component{
    constructor(props){
        super(props)
        this.state = {
            blogsCount : [],
            isDataReturned: true
        }
    }

    // componentDidMount(){

    //     Axios.get(`http://${window.location.hostname}:5005/blogs/count/`).then(blogsCount => {
    //         console.log(blogsCount);
    //         this.setState({
    //             blogsCount: blogsCount.data,
    //             isDataReturned: true
    //         })
    //     }).catch(error => {
    //         console.log("Axios error")
    //         console.log(error)
    //     })


        
    // }


    

    TagComponentHandler = (e)=>{
        if(e.target.value !=0){
            console.log(e.target.value)
            window.location.href = "/blogs/tag/"+e.target.value;
        }        
    }
    

    render(){
        return(
            this.state.isDataReturned?
            <>
            <div className="my-4">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-12">
                            <div>
                                <Card style={{marginBottom:"20px"}}>
                                    <CardTitle style={{padding:"20px"}}><h3> Meet the Mentors</h3></CardTitle>
                                    
                                    <CardBody>

                                    <p>
                                        Our Mentors are from premier institutes of india like IITs, NITs, AIIMSs and other top universities.
                                        who have faced the same problems which you are facing right now. they will provide you their own experience,strategies. It's going to definitely help you crack the JEE,NEET & AIIMS exam.
                                    </p>
                                    <p>

                                    <Alert color="success"> <h3>
                                        <Link to="/login">Be a Mentor </Link>to change people’s lives.
                                        </h3>Share your experience & knowledge with the world online. If you are passionate about Mentoring / coaching to people who needs guidance, this is the place to be in.</Alert>
                                        {/* <b></b> to change people’s lives.<br /> */}
                                        
                                    </p>
                                    </CardBody>
                                </Card>
                                <nav>
                                    <div className="nav-tabs-question d-flex justify-content-between">
                                        <div className="nav nav-tabs " id="nav-tab" role="tablist">
                                            <a href="/mentors" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/mentors' ? 'active' : '')} id="nav-home-tab">ALL</a>
                                            <a href="/mentors/jee" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/mentors/jee' ? 'active' : '')} id="nav-home-tab">JEE</a>
                                            <a href="/mentors/neet" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/mentors/neet' ? 'active' : '')} id="nav-profile-tab" >NEET</a>
                                            <a href="/mentors/career" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/mentors/career' ? 'active' : '')} id="nav-contact-tab">CAREER</a>
                                            {/* <a href="/blogs/development" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/blogs/development' ? 'active' : '')} id="nav-contact-tab">DEVELOPMENT</a> */}

                                        </div>
                                        {/* <div class="d-none d-md-block">
                                            <select class="custom-select border-0 rounded-0 bg-warning text-white" onChange={this.TagComponentHandler} >
                                                
                                                <option value={0} selected>Choose Tag...</option>
                                                <option value="physics">PHYSICS</option>
                                                <option value="chemistry">CHEMESTRY</option>
                                                <option value="maths">MATHS</option>
                                                <option value="biology">BIOLOGY</option>
                                                <option value="pcm">PCM</option>
                                                <option value="pcb">PCB</option>
                                                <option value="jee-exam">JEE-EXAM</option>
                                                <option value="neet-exam">NEET-EXAM</option>
                                                <option value="dev-blog">DEV-BLOG</option>
                                            </select>
                                        </div> */}
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
                    </div>
                </div>

                <div class="modal fade" id="blogform" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content border-warning">
                            <div class="modal-header py-2">
                                <h6 class="modal-title" id="exampleModalLabel">Ask A Question</h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            </>
            :""
        )
    }
}

export default MentorLists;