import React, { Component } from 'react'
import BlogPosts from './BlogPosts'
import BlogSideBar from './BlogSideBar'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import avatar from '../../assets/default-avatar.png'
import NavBarLog from './../NavBarLog.js'

import {setQDate,checktoken} from "../CommonFunc/common.js"


class CommentComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            bid: this.props.commentData.bid,
            currUser: JSON.parse(localStorage.getItem('user')),
            comment: "",
        }
    }

    onChange =(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler =(e)=> {
        e.preventDefault();
        // console.log(this.state.comment)
        const commentSchema = {
            author : localStorage.getItem('user'),
            comment : this.state.comment
        }

        const token = localStorage.getItem('token');
        // console.log("token is " + `Bearer ${token}`)

        Axios.post(`http://${window.location.hostname}:5005/blog/comment/${this.state.bid}`, commentSchema, {
            headers: {
                'Authorization': `Bearer ${token}` 
            } 
        }).then(result => {
            console.log(result);
            if(result){
                window.location.reload();
                
            }
            
        }).catch(error => {
            console.log("Axios Error");
            console.log(error);
        })
    }



    render() {
        return (
            <div className="card">
                <div class="card-header bg-white py-2">
                        <h6 className="text-info mb-0 cursor-pointer">Comments</h6>
                    </div>
                <div className="d-block"> 
                    <div class="card-body">
                        {this.props.commentData.allComments? this.props.commentData.allComments.map((eachComment, index)=>{
                            let user = JSON.parse(eachComment.author);
                            return(
                                <div className="mb-3">
                                    <div className="d-flex align-items-baseline">
                                        <h6 class="card-title mb-0 mr-2">{user.firstName+" "+user.lastName}</h6>
                                        
                                    </div>                                     
                                    <h6 className="text-muted mb-1 small">{setQDate(eachComment.date)}</h6>                                   
                                    <p class="card-text small">{eachComment.comment}</p>
                                </div>
                            )
                        }):""}

                    <form onSubmit={this.onSubmitHandler}>
                        <div class="input-group">                    
                            <input type="text" class="form-control form-control-sm" name="comment" placeholder="Add a Comment"
                            value={this.state.comment} onChange={this.onChange} />
                            <div class="input-group-append">
                                {localStorage.getItem('token') ?
                                <button class="btn btn-info btn-sm" type="submit">Comment</button>
                                 :
                                    <Link class="btn btn-info btn-sm" to="/login">Comment</Link>
                                }
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

class BlogDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            bid: this.props.match.params.bid,
            blogData : "",
            author: "",
            isDataReturned: false,
            vote: "text-info",
            likesCount: 0,
            currUser: JSON.parse(localStorage.getItem('user')),
        }
    }

    componentDidMount(){

        checktoken();

        const token = localStorage.getItem('token');
        // console.log("token is " + `Bearer ${token}`)

        Axios.get(`http://${window.location.hostname}:5005/blog/`+this.state.bid).then(blogData => {
            console.log(blogData);
            this.setState({
                blogData: blogData.data,
                likesCount: blogData.data.likes.length,
                author: JSON.parse(blogData.data.author),
                isDataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })

        
        Axios.put(`http://${window.location.hostname}:5005/blog/views/`, {
            bid: this.state.bid
        }, {
            headers: {
                'Authorization': `Bearer ${token}` 
            } 
        }).then(viewsResult => {
            console.log(viewsResult);
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })

    }

    Vote(event, bid){
        // console.log(aid)

        const token = localStorage.getItem('token');
        // console.log("token is " + `Bearer ${token}`)

        const uSchema = {
            uid: this.state.currUser._id,
            bid: bid
        }

        Axios.put(`http://${window.location.hostname}:5005/blog/likes/`, uSchema, {
            headers: {
                'Authorization': `Bearer ${token}` 
            } 
        }).then(result => {
            console.log(result);
            if(result.data == "upvote"){
                this.setState({
                    vote: "text-warning",
                    likesCount: this.state.likesCount + 1
                })
            }
        }).catch(error => {
            console.log("Axios Error");
            console.log(error);
        })
    }
  
    render(){
        return(
            this.state.isDataReturned?
            <>
            {/* <NavBarLog /> */}
            <div className="conatiner-fluid container-lg">
                <div className="my-5">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card p-sm-5 py-4">
                                <div className="card-header bg-white border-0">
                                    <div className="d-flex justify-content-between">
                                        <div className='d-flex justify-content-start align-items-center'>
                                            <img className='rounded-circle border border-warning' src={avatar} width="40" height="40"/>
                                            <div className="">
                                                <h6 className='ml-2 mb-0 font-weight-bold'>{this.state.author.firstName+" "+this.state.author.lastName}</h6>
                                                <h6 className='ml-2 mb-0 small text-muted font-weight-bold'>{setQDate(this.state.blogData.date)}</h6>
                                            </div>
                                            
                                        </div>
                                        <div>
                                            <h4 className="vote-btn dfdsf text-info cursor-pointer" >
                                                {localStorage.getItem('token') ?
                                                <>
                                                {this.state.blogData.likes.includes(this.state.currUser._id) ? 
                                                    <i class="far fa-arrow-alt-circle-up text-warning"></i>
                                                    : <i class={"far fa-arrow-alt-circle-up " + this.state.vote } onClick={(e)=>this.Vote(e, this.state.blogData._id)}></i>
                                                }
                                                </>
                                                :
                                                    <Link to="/login" className="text-decoration-none"><i class="far fa-arrow-alt-circle-up text-info"></i></Link>
                                                }
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body">
                                    <div className="mb-3">
                                            <h4 className="card-text font-weight-bold text-dark">{this.state.blogData.title}</h4>
                                        <h6 className="font-weight-bold text-muted mr-2">{this.state.blogData.category+" - "+this.state.blogData.tag}</h6>
                                        
                                    </div>
                                    { this.state.blogData.body_image ? <img class="card-img-top w-100 mt-3" src={this.state.blogData.body_image} alt="alternate image"/>: "" }
                                    <h6 class="card-title text-muted my-4" style={{"letterSpacing":"1px","whiteSpace":"pre-wrap"}}>
                                        {this.state.blogData.body_text}
                                    </h6>
                                    
                                    {/* <img class="card-img-top w-100" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&w=1000&q=80" alt="alternate image" style={{"width":"100%", "maxHeight":"25rem"}} /> */}

                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div>
                                <div className="card my-2 mt-md-0">
                                    <div className="card-body pb-0">
                                        <h5 className="card-title text-warning pb-2 border-bottom">Stats</h5>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">{this.state.likesCount} Votes</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">{this.state.blogData.views} Views</h6>
                                        </div>
                                        <div className="alert alert-dark py-2 px-3" role="alert">
                                            <h6 className="mb-0">{this.state.blogData.comments.length} Comments</h6>
                                        </div>
                                    </div>
                                </div>
                                <CommentComponent commentData={{"bid": this.state.bid, "allComments": this.state.blogData.comments}}/>
                            </div>
                        </div>

                    </div>
                </div>
                
                    
                </div>
            
            
            </>
            :""
            // <section className='row container-fluid container-md mx-auto my-5'>
            //     <BlogPosts/>
            //     <BlogSideBar/>
            // </section>
        )
        
    }

            
}

export default BlogDetail;
   
