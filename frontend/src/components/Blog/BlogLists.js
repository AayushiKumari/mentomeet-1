import React, { Component, Suspense } from "react"
import Axios from 'axios'
import $ from "jquery"
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, InputGroupText,  InputGroupAddon, InputGroup} from 'reactstrap';
import { Link, BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

// import NavBarLog from './../NavBarLog.js'
import Routes from "./BlogRoutes.js"
import BlogCreateForm from "./BlogCreateForm"




// import EachQuestion from "./EachQuestion"
import {checktoken} from "../CommonFunc/common.js"

const required = (val) => val && val.length;

class LikedBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            // category: this.props.category.cat,
            // qid: this.props.category.qid,
            likedBlog: [],
            isDataReturned: false
        }
    }

    componentDidMount(){
        Axios.get(`http://${window.location.hostname}:5005/blogs/liked/`).then(likedBlog => {
            console.log(likedBlog);
            this.setState({
                likedBlog: likedBlog.data,
                isDataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })
    }

    render(){
        return(
            this.state.isDataReturned && this.state.likedBlog.length>1?
            <div>
                {this.state.likedBlog.map((blog, index)=>{                    
                    return(
                        // eachQuest._id === this.state.qid ? "" :
                        <h6 className="small font-weight-bold mb-3">
                            <a href={`/blogs/view/${blog._id}`} className="text-decoration-none">{blog.title}</a>
                        </h6>
                    )
                })}
            </div>
            : <h6>No Blogs</h6>
        )
    }

}

class BlogLists extends Component{
    constructor(props){
        super(props)
        this.state = {
            blogsCount : [],
            currUserRole: JSON.parse(localStorage.getItem('user')).role,
            isDataReturned: false
        }
    }

    componentDidMount(){
        checktoken();

        Axios.get(`http://${window.location.hostname}:5005/blogs/count/`).then(blogsCount => {
            console.log(blogsCount);
            this.setState({
                blogsCount: blogsCount.data,
                isDataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })


        
    }


    

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
                        <div className="col-md-8">
                            <div>
                                <div className="d-flex justify-content-between mb-3 d-md-none">
                                    {/* <button type="button" className="btn btn-info " data-toggle="modal" data-target="#blogform">Write a Blog</button> */}
                                    {this.state.currUserRole == "Mentee"? ""
                                        :<button type="button" className="btn btn-info d-md-none" data-toggle="modal" data-target="#blogform">Write a Blog</button>
                                    }
                                    <div class="">
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
                                    </div>
                                </div>
                                <nav>
                                    <div className="nav-tabs-question d-flex justify-content-between">
                                        <div className="nav nav-tabs " id="nav-tab" role="tablist">
                                            <a href="/blogs" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/blogs' ? 'active' : '')} id="nav-home-tab">ALL</a>
                                            <a href="/blogs/jee" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/blogs/jee' ? 'active' : '')} id="nav-home-tab">JEE</a>
                                            <a href="/blogs/neet" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/blogs/neet' ? 'active' : '')} id="nav-profile-tab" >NEET</a>
                                            <a href="/blogs/career" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/blogs/career' ? 'active' : '')} id="nav-contact-tab">CAREER</a>
                                            {/* <a href="/blogs/development" className={"nav-item text-dark py-1 px-2 px-sm-3 border-0 nav-link " + (window.location.pathname === '/blogs/development' ? 'active' : '')} id="nav-contact-tab">DEVELOPMENT</a> */}

                                        </div>
                                        <div class="d-none d-md-block">
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
                                    {/* <button type="button" className="btn btn-info d-none d-md-block w-100" data-toggle="modal" data-target="#blogform">Write a Blog</button> */}
                                    {this.state.currUserRole == "Mentee"? ""
                                        :<button type="button" className="btn btn-info d-none d-md-block w-100" data-toggle="modal" data-target="#blogform">Write a Blog</button>
                                    }
                                </div>

                                <div className="card my-2">
                                    <div className="card-body pb-0">
                                        <h5 className="card-title text-warning pb-2 border-bottom">Stats</h5>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">JEE ({this.state.blogsCount.jee_blogs})</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">NEET ({this.state.blogsCount.neet_blogs})</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">CAREER ({this.state.blogsCount.career_blogs})</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">DEVELOPMENT ({this.state.blogsCount.development_blogs})</h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="card my-2">
                                    <div className="card-body pb-2">
                                        <h5 className="card-title text-warning pb-2 border-bottom">Liked Blogs</h5>
                                        <div>
                                        <LikedBlog />
                                        </div>
                                    </div>
                                </div>
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
                                <BlogCreateForm />
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

export default BlogLists;