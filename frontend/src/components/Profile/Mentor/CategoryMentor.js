import React, {Component} from 'react'
import Axios from 'axios'
import ReactLoading from 'react-loading';
import { Row } from "reactstrap";

import EachMentor from "./EachMentor"
import NoBlog from "./NoMentors"

class CategoryMentor extends Component{
    constructor(props){
        super(props)
        this.state = {
            category: this.props.match.params.category,
            catMentors : [],
            isDataReturned: false
        }
    }

    componentDidMount(){
        Axios.get(`http://${window.location.hostname}:5005/mentors/`+this.state.category).then(catMentors => {
            console.log(catMentors);
            // if(allBlogs.data.length > 0){
                this.setState({
                    catMentors: catMentors.data,
                    isDataReturned: true
                })
            // }
            
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })
    }
    

    render(){
        return(  
            this.state.isDataReturned ?
            
                <>
                    {this.state.catMentors.length > 0 ? 
                        <div className="mb-5">
                            <div className="team"  style={{zIndex:"-100"}} >
                                <Row  style={{zIndex:"-100"}} >
                                    {this.state.catMentors.map((data, index) => {
                                        return(
                                            // <EachBlog blogdata={{"eachBlog": data}}/> 
                                            <EachMentor mentordata={{"eachMentor": data}}/>                           
                                        )
                                    })}
                                </Row>
                            </div>
                        </div>
                    : <NoBlog />}
                    
                </>


            : <ReactLoading style={{ color: "black", margin: "auto", height: "20%", width: "20%" }} type={"spinningBubbles"} />
            
            // <div>CategoryBlog</div>
        )
    }
}

export default CategoryMentor;