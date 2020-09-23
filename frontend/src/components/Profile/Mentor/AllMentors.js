import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import ReactLoading from 'react-loading';
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
            this.state.isDataReturned ?
            
                <>
                    {this.state.allMentors.length > 0 ? 
                        <div className="mb-5">
                            <div className="team"  style={{zIndex:"-100"}} >
                                <Row  style={{zIndex:"-100"}} >
                                
                                        {this.state.allMentors.map((data, index) => {
                                            return(
                                                <EachMentor mentordata={{"eachMentor": data}}/>
                                                
                                            )
                                        })}
                                </Row>
                            </div>
                        </div>
                    : <NoMentors />}
                    
                </>


            : <ReactLoading style={{ color: "black", margin: "auto", height: "20%", width: "20%" }} type={"spinningBubbles"} />
            
        )
    }
}

export default AllMentors;