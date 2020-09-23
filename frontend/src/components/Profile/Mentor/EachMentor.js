import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {
    Button,
    Container,
    Row,
    Col
  } from "reactstrap";

import avatar from '../../../assets/default-avatar.png'

import {setQDate} from "../../CommonFunc/common.js"

class EachMentor extends Component{
    constructor(props){
        super(props)
        this.state = {
            mentor : this.props.mentordata.eachMentor,
        }
        
    }    

    render(){
        return(
            <Col lg="4" md="4" sm="6" style={{paddingTop:"50px"}}>

                        

                            <div className="team-player">
                                <div className="flip-box flip-box-team">
                                <div className="flip-box-inner flip-box-inner-team" style={{opacity:"1"}}>
                                    <div className="flip-box-front" style={{backgroundColor:"rgba(0,0,0,0)",opacity:"1"}}>
                                    <img
                                        alt={this.state.mentor.firstName}
                                        className="rounded-circle img-fluid img-raised"
                                        // data.profile_picture ? <img class="card-img-top w-100" src={data.profile_picture} alt="alternate image" style={{"width":"100%", "maxHeight":"20rem"}} />: ""
                                        src={this.state.mentor.history.length>0 && this.state.mentor.history[0].profile_picture !="" ? this.state.mentor.history[0].profile_picture: avatar}
                                        style={{width:"180px" ,height:"180px" ,maxWidth:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                                    ></img>
                                    </div>
                                    <div className="flip-box-back" style={{backgroundColor:"rgba(0,0,0,0)",opacity:"1"}}>
                                    <img 
                                        alt={this.state.mentor.firstName+" "+this.state.mentor.lastName}
                                        className="rounded-circle img-fluid img-raised"
                                        src={this.state.mentor.history.length>0 && this.state.mentor.history[0].profile_picture !="" ? this.state.mentor.history[0].profile_picture: avatar}
                                        style={{width:"180px" ,height:"180px" ,maxWidth:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                                    ></img>  
                                    </div>
                                </div>
                                </div>
                                
                                <div className="text-center">
                                   <a className="text-decoration-none" href={this.state.mentor.history.length>0?'/profile/' + this.state.mentor._id:"#"} target="_blank"> <h4 className="title text-warning mt-5">{this.state.mentor.firstName+" "+this.state.mentor.lastName}</h4> </a>
                                    <h6 className="title text-info">{this.state.mentor.history.length>0?this.state.mentor.history[0].college:""}</h6>
                                    <h6 className="title text-info">{this.state.mentor.category}-{this.state.mentor.history.length>0?this.state.mentor.history[0].expertise:""}</h6>
                                    <h6 className="title text-info">{this.state.mentor.history.length>0?this.state.mentor.history[0].start_time+" "+this.state.mentor.history[0].end_time:""}</h6>
                                    {/* <Button
                                    className="btn-icon btn-round mr-2"
                                    color="info"
                                    href={this.state.mentor.history.length>0?this.state.mentor.history[0].fb_link:"https://www.facebook.com"}
                                    target="_blank"
                                    >
                                    <i className="fab fa-facebook"></i>
                                    </Button>
                                    <Button
                                    className="btn-icon btn-round"
                                    color="info"
                                    href={this.state.mentor.history.length>0?this.state.mentor.history[0].linkedin_link:"https://www.linkedin.com"}
                                    target="_blank"
                                    >
                                    <i className="fab fa-linkedin"></i>
                                    </Button> */}
                                </div>
                                
                            </div>
                            </Col>
        )
    }
}

export default EachMentor;
