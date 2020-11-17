import React, { Component, Suspense } from "react"
import Axios from 'axios'
import $ from "jquery"
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, InputGroupText,  InputGroupAddon, InputGroup, Card, CardBody, CardTitle, Alert} from 'reactstrap';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import ReactLoading from 'react-loading';

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
            this.state.isDataReturned ?
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
                                        "Where there's a will, there's a way"
                                        </h3>Now you can also connect your mentors through Google meet services from 5 pm to 6 pm.<br />
                                           <div class="d-md-flex justify-content-between">
                                                {localStorage.getItem('token') ?
                                                  <a className="btn btn-info btn-sm mt-2" href="https://meet.google.com/cuz-ubfq-ydn" target="_blank">Talk to IIT-JEE Mentors</a>
                                                  :<Link className="btn btn-info btn-sm mt-2" to="/login">Talk to IIT-JEE Mentors</Link>
                                                }

                                                {localStorage.getItem('token') ?
                                                  <a className="btn btn-info btn-sm mt-2" href="https://meet.google.com/wwa-cvii-eit" target="_blank">Talk to NEET/AIIMS Mentors</a>
                                                  :<Link className="btn btn-info btn-sm mt-2" to="/login">Talk to NEET/AIIMS Mentors</Link>
                                                }
                                                
                                                
                                            </div>
                                        </Alert>
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
            :<ReactLoading style={{ color: "black", margin: "auto", height: "20%", width: "20%" }} type={"spinningBubbles"} />
        )
    }
}

export default MentorLists;
