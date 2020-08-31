import React, {Component} from "react"
import $ from "jquery"
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Row, Label, Col, Container, Breadcrumb, BreadcrumbItem, Button, InputGroupText,  InputGroupAddon, InputGroup} from 'reactstrap';
import Axios from 'axios'
import Loader from "react-loader"
// var Loader = require(');

import NavBarLog from './../NavBarLog.js'

import {setQDate,checktoken} from "../CommonFunc/common.js"


const required = (val) => val && val.length;

class CommentComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            qid: this.props.commentData.qid,
            aid: this.props.commentData.aid,
            currUser: JSON.parse(localStorage.getItem('user')),
            comment: "",
            isOpen: false
        }
    }

    // componentDidMount{

    // }

    onChange =(e)=> {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmitHandler =(e)=> {
        e.preventDefault();
        console.log(this.state.comment)
        const commentSchema = {
            author : localStorage.getItem('user'),
            comment : this.state.comment
        }

        const token = localStorage.getItem('token');
        console.log("token is " + `Bearer ${token}`)

        Axios.post("http://localhost:5005/quora/question/"+this.state.qid+"/answer/"+this.state.aid+`/comment/${this.state.currUser._id}`, commentSchema, {
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

    
    OpenComment =(e)=> {
        this.setState({
            isOpen : !(this.state.isOpen)
        })
    }


    render() {
        return (
            <div className="">
                <div class="card-footer bg-white py-2">
                        <h6 className="text-info mb-0 cursor-pointer" onClick={this.OpenComment}>{this.props.commentData.allComments.length>0 ? this.props.commentData.allComments.length+" Comments": "Comment" }</h6>
                    </div>
                <div className={this.state.isOpen ? "d-block":"d-none"}> 
                    <div class="card-body">
                        {this.props.commentData.allComments.map((eachComment, index)=>{
                            let user = JSON.parse(eachComment.author);
                            return(
                                <div className="mb-3">
                                    <div className="d-flex align-items-baseline">
                                        <h6 class="card-title mb-0 mr-2">{user.firstName+" "+user.lastName}</h6>
                                        <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">JEE</a>
                                    </div>                                     
                                    <h6 className="text-muted mb-1 small">{setQDate(eachComment.date)}</h6>                                   
                                    <p class="card-text small">{eachComment.comment}</p>
                                </div>
                            )
                        })}
                        

                    <form onSubmit={this.onSubmitHandler}>
                        <div class="input-group">                    
                            <input type="text" class="form-control form-control-sm" name="comment" placeholder="Add a Comment"
                            value={this.state.comment} onChange={this.onChange} />
                            <div class="input-group-append">
                                <button class="btn btn-info btn-sm" type="submit">Comment</button>
                            </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        )
    }
}

class AnswerComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            qid: this.props.ansData.qid,
            answer: this.props.ansData.answer,
            ansUser: JSON.parse(this.props.ansData.answer.author),
            likesCount: this.props.ansData.answer.likes.length,
            currUser: JSON.parse(localStorage.getItem('user'))
        }
    }

    Vote(event, aid){
        console.log(aid)
        Axios.post(`http://localhost:5005/quora/like/${this.state.currUser._id}/question/`+this.state.qid+"/answer/"+aid).then(result => {
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
         
            <li class="list-group-item p-0">
                <div className="p-3">
                    <div className="user-info d-flex justify-content-between">
                        <div className="">
                            <div className="d-flex align-items-baseline">
                                <h6 className="mr-2 m-0">{this.state.ansUser.firstName+" "+this.state.ansUser.lastName}</h6>
                                <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">Mentor</a>
                            </div>
                            <div className="d-flex align-items-baseline">
                                <p className="text-muted small pr-2">{setQDate(this.state.answer.date)}</p>
                                <p className="text-muted small">{this.state.likesCount + " votes"}</p>
                            </div>
                            
                        </div>
                        <div>
                            <h4 className="vote-btn dfdsf text-info cursor-pointer" >
                                {this.state.answer.likes.includes(this.state.currUser._id) ? 
                                    <i class="far fa-arrow-alt-circle-up text-warning"></i>
                                    : <i class={"far fa-arrow-alt-circle-up " + this.state.vote } onClick={(e)=>this.Vote(e, this.state.answer._id)}></i>
                                }
                            </h4>
                        </div>
                    </div>                                        
                    <div>
                        <p className="text-muted ">{this.state.answer.answer}</p>
                        { this.state.answer.images !="no image"? <img class="card-img-top w-100" src={this.state.answer.images} alt="alternate image"/>: "" }
                    </div>
                </div>
                <CommentComponent commentData={{"aid": this.state.answer._id, "qid": this.state.qid, "allComments": this.state.answer.comments}}/>
                
            </li>                              
         
        )
    }
}





class Answer extends Component{
    constructor(props){
        super(props)
        this.state = {
            qid: this.props.match.params.id,
            selectedFile: null,
            questionData : "",
            qUser: "",
            isDataReturned: false,
            vote: "text-info",
            currUser: JSON.parse(localStorage.getItem('user')),
        }
    }

    onFileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        })
    }
    handleSubmit = (values) => {
        console.log(values)
        console.log("SelectedFile is ");
        console.log(this.state.selectedFile)

        const formData = new FormData();
        formData.append("author", localStorage.getItem('user'));
        formData.append("answer", values.answer);
        formData.append("file", this.state.selectedFile);
        console.log(formData);

        const token = localStorage.getItem('token');
        console.log("token is " + `Bearer ${token}`)

        Axios.post(`http://localhost:5005/quora/answer/${this.state.currUser._id}/question/`+this.state.qid, formData, {
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

    componentDidMount(){

        checktoken();

        Axios.get("http://localhost:5005/quora/question/"+this.state.qid).then(questionData => {
            console.log(questionData);
            this.setState({
                questionData: questionData.data,
                qUser: JSON.parse(questionData.data.author),
                isDataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })

        Axios.put("http://localhost:5005/quora/question/view/"+this.state.qid).then(viewsResult => {
            console.log(viewsResult);
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })

        
        $(".custom-file-input").on("change", function() {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
          });
    }


    


    render(){

        return(
            <div>
                <NavBarLog />
            { this.state.isDataReturned ? 
            
                <div className="my-4">
                    <div className="container-lg">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card">
                                    <div class="card-body">
                                        <div className="d-flex align-items-baseline">
                                            <h6 className="card-text mr-2">{this.state.qUser.firstName+" "+this.state.qUser.lastName}</h6>
                                            <a href="#" class="bg-warning px-2  text-decoration-none text-white small rounded">{this.state.questionData.category}</a>
                                        </div> 
                                        <h5 class="card-title mb-0"><a className="text-decoration-none">{this.state.questionData.question}</a></h5>
                                        <p className="card-text text-muted small mr-2">{setQDate(this.state.questionData.date)}</p>
                                        
                                        { this.state.questionData.images? <img class="card-img-top w-100" src={this.state.questionData.images} alt="alternate image"/>: "" }
                                        
                                        <div className="mt-3">
                                        {this.state.questionData.tags.map((tag, index)=>{
                                            return(
                                                <a href="#" class="badge badge-warning mr-2">{tag}</a>
                                            )                                            
                                        })}                 
                                        </div>
                                    </div> 
                                </div>
                                <button type="button" className="btn btn-info mt-3 w-100 d-md-none" data-toggle="modal" data-target="#answerModal">Write a Answer</button>

                                <div className="card mt-3">
                                    <div className="card-header py-2">
                                        <h5 className="text-info mb-0">{this.state.questionData.answers.length>0 ? "Answers": "No Answer"}</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                    {this.state.questionData.answers.map((eachAns, index)=>{
                                        return(
                                            <AnswerComponent ansData={{"answer": eachAns, "qid": this.state.qid}} />
                                        )
                                    })}
                                    </ul>

                                </div>

                        

                                {/* <AnswerComponent ansData={{"allAns": this.state.questionData.answers, "qid": this.state.qid}} /> */}

                                
                            </div>
                            <div className="col-md-4">
                                <div> 
                                <button type="button" className="btn btn-info d-none d-md-block w-100" data-toggle="modal" data-target="#answerModal">Write a Answer</button>                               
                                    <div className="card my-2">
                                        <div className="card-body pb-0">
                                            <h5 className="card-title text-warning pb-2 border-bottom">Stats</h5>
                                            <div className="alert alert-dark py-2 px-3" role="alert">
                                                <h6 className="mb-0">Answers ({this.state.questionData.answers.length})</h6>
                                            </div>
                                            <div className="alert alert-dark py-2 px-3" role="alert">
                                                <h6 className="mb-0">Best Answers (15)</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card my-2">
                                        <div className="card-body pb-2">
                                            <h5 className="card-title text-warning pb-2 border-bottom">Related Questions</h5>
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

                    <div class="modal fade" id="answerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header py-2">
                                    <h6 class="modal-title" id="exampleModalLabel">Write Answer</h6>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">


                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                        <Col md={12}>
                                            <Control.textarea model=".answer"
                                                id="answer"
                                                name="answer"
                                                rows="5"
                                                placeholder="Your Answer..."
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                show="touched"
                                                model=".answer"
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
                                        <Col md={{ size: 12 }}>
                                            <Button type="submit" block color="info">
                                                Submit
                                        </Button>
                                        </Col>
                                    </Row>
                                </LocalForm>

                                    {/* <form>
                                        <div class="form-group">
                                            <textarea class="form-control" id="answer-text" rows="5" placeholder="Write Answer..." required></textarea>
                                        </div>
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="customFile" />
                                            <label class="custom-file-label" for="customFile">Choose file</label>
                                        </div>
                                        <div className="my-3 text-center">
                                            <button type="submit" class="btn btn-info w-100">Submit Question</button>
                                        </div>
                                    </form> */}
                                </div>
                                
                            </div>
                        </div>
                    </div>  
            </div>
            
            
            :""}
            </div>

            
        )
    }
}



export default Answer;