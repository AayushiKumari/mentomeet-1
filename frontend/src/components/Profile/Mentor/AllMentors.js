import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import {
    Button,
    // Input,
    // InputGroupAddon,
    // InputGroupText,
    // InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";

import EachMentor from "./EachMentor"
import NoMentors from './NoMentors'

// import avatar from '../assets/default-avatar.png';
import avatar from '../../../assets/default-avatar.png';

class AllMentors extends Component{
    constructor(props){
        super(props)
        this.state = {
            allMentors : [],
            isDataReturned: false
        }
        
    }  
    
    componentDidMount(){
        Axios.get(`http://${window.location.hostname}:5005/allmentors`).then(allMentors => {
            console.log(allMentors);
            this.setState({
                allMentors: allMentors.data,
                isDataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })
    }

    render(){
        return(
            this.state.isDataReturned && this.state.allMentors.length > 0 ?   
            
            <div className="mb-5">
            <div className="team"  style={{zIndex:"-100"}} >
              <Row  style={{zIndex:"-100"}} >
               
                    {this.state.allMentors.map((data, index) => {
                        return(
                            <EachMentor mentordata={{"eachMentor": data}}/>
                            // <Col lg="4" md="4" sm="6" style={{paddingTop:"50px"}}>

                        

                            // <div className="team-player">
                            //     <div className="flip-box flip-box-team">
                            //     <div className="flip-box-inner flip-box-inner-team" style={{opacity:"1"}}>
                            //         <div className="flip-box-front" style={{backgroundColor:"rgb(245 245 245)",opacity:"1"}}>
                            //         <img
                            //             alt={data.firstName}
                            //             className="rounded-circle img-fluid img-raised"
                            //             // data.profile_picture ? <img class="card-img-top w-100" src={data.profile_picture} alt="alternate image" style={{"width":"100%", "maxHeight":"20rem"}} />: ""
                            //             src={data.history.length>0 && data.history[0].profile_picture !="" ? data.history[0].profile_picture: avatar}
                            //             style={{width:"180px" ,height:"180px" ,maxWidth:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                            //         ></img>
                            //         </div>
                            //         <div className="flip-box-back" style={{backgroundColor:"rgba(0,0,0,0)",opacity:"1"}}>
                            //         <img 
                            //             alt={data.firstName+" "+data.lastName}
                            //             className="rounded-circle img-fluid img-raised"
                            //             src={data.history.length>0 && data.history[0].profile_picture !="" ? data.history[0].profile_picture: avatar}
                            //             style={{width:"180px" ,height:"180px" ,maxWidth:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                            //         ></img>  
                            //         </div>
                            //     </div>
                            //     </div>
                                
                            //     <div className="text-center">
                            //         <h4 className="title text-warning mt-5">{data.firstName+" "+data.lastName}</h4>
                            //         <h6 className="title text-info">{data.category}</h6>
                            //         <Button
                            //         className="btn-icon btn-round mr-2"
                            //         color="info"
                            //         href={data.history.length>0?data.history[0].fb_link:"https://www.facebook.com"}
                            //         target="_blank"
                            //         >
                            //         <i className="fab fa-facebook"></i>
                            //         </Button>
                            //         <Button
                            //         className="btn-icon btn-round"
                            //         color="info"
                            //         href={data.history.length>0?data.history[0].linkedin_link:"https://www.linkedin.com"}
                            //         target="_blank"
                            //         >
                            //         <i className="fab fa-linkedin"></i>
                            //         </Button>
                            //     </div>
                                
                            // </div>
                            // </Col>
                            
                        )
                    })}
                    
                
                
                  
      
              </Row>
              
            </div>
            
          

                {/* <div>
                    {this.state.allMentors.map((data, index) => {
                        return(
                            <EachMentor mentordata={{"eachMentor": data}}/>
                            
                        )
                    })}
                    
                </div> */}

                </div>



            : <NoMentors />
            
        )
    }
}

export default AllMentors;