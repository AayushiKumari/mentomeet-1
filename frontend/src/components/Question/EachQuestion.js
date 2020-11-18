import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

import {setQDate} from "../CommonFunc/common.js"


class EachQuestion extends Component{
    constructor(props){
        super(props)
        this.state = {
            sQuestion : this.props.question.eachQuest,
            user: JSON.parse(this.props.question.eachQuest.author),
            currUser: JSON.parse(localStorage.getItem('user')),
            vote: "text-info",
            likesCount: this.props.question.eachQuest.likes.length
        }
    }

    Vote(event, qid){
        const token = localStorage.getItem('token');
        // console.log("token is " + `Bearer ${token}`)
        const uSchema = {
            uid: this.state.currUser._id,
            qid: qid
        }
        Axios.put(`http://${window.location.hostname}:5005/quora/like/question/`, uSchema, {
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
            <div class="card my-2">
                <div class="card-body">
                    <div className="d-flex align-items-baseline">
                        <h6 className="card-text mr-2">{this.state.user.firstName +" "+ this.state.user.lastName}</h6>
                        <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">{this.state.sQuestion.category}</a>
                    </div>
                    <h5 class="card-title"><Link to={"/answer/"+this.state.sQuestion._id} className="text-decoration-none">{this.state.sQuestion.question}</Link></h5>
                    { this.state.sQuestion.images? <img class="card-img-top w-100" src={this.state.sQuestion.images} alt="alternate image" style={{"width":"100%", "maxHeight":"24rem"}} />: "" }
                    <div className="mt-3">
                        {this.state.sQuestion.tags.map((tag, index) => {
                            return(
                                <a href="#" class="badge badge-warning mr-2">{tag.toUpperCase()}</a>
                            )                                        
                        })}
                    </div>
                    
                </div>
                <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex">
                            <div className="d-flex align-items-center pr-3">
                                <h5 className="vote-btn cursor-pointer" >
                                    {localStorage.getItem('token') ?
                                    <>
                                    {this.state.sQuestion.likes.includes(this.state.currUser._id) ? 
                                        <i class="far fa-arrow-alt-circle-up text-warning"></i>
                                        : <i class={"far fa-arrow-alt-circle-up " + this.state.vote } onClick={(e)=>this.Vote(e, this.state.sQuestion._id)}></i>
                                    }
                                    </>
                                    :
                                        <Link to="/login" className="text-decoration-none"><i class="far fa-arrow-alt-circle-up text-info"></i></Link>
                                    }
                                    
                                </h5>
                                <h6 className="vote-counter pl-1 small">{this.state.likesCount}</h6>
                            </div>
                            <div className="d-flex align-items-center pr-3">
                                <h5 className="time-btn text-info cursor-pointer"><i class="far fa-clock"></i></h5>
                                <h6 className="time-counter pl-1 small">{setQDate(this.state.sQuestion.date)}</h6>
                            </div>
                            <div className="d-flex align-items-center pr-3">
                                <h5 className="views-btn text-info cursor-pointer"><i class="far fa-eye"></i></h5>
                                <h6 className="views-counter pl-1 small">{this.state.sQuestion.views}</h6>
                            </div>
                        </div>
                        <div className="dropleft">
                            <h5 className="dot-btn text-info cursor-pointer" data-toggle="dropdown"><i class="fas fa-ellipsis-h"></i></h5>
                            <div class="dropdown-menu shadow border-info p-0">
                                <Link to={"/answer/"+this.state.sQuestion._id} class="dropdown-item">view</Link>
                                <Link to={"/answer/"+this.state.sQuestion._id} class="dropdown-item">answer</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export default EachQuestion;
