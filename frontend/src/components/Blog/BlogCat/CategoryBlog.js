import React, {Component} from 'react'
import Axios from 'axios'
import ReactLoading from 'react-loading';

import EachBlog from "./EachBlog"
import NoBlog from "./NoBlog"

class CategoryBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            category: this.props.match.params.category,
            allBlogs : [],
            isDataReturned: false
        }
    }

    componentDidMount(){
        Axios.get(`http://${window.location.hostname}:5005/blogs/`+this.state.category).then(allBlogs => {
            console.log(allBlogs);
            // if(allBlogs.data.length > 0){
                this.setState({
                    allBlogs: allBlogs.data,
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
            {this.state.allBlogs.length>0 ? 
                <div>
                    {this.state.allBlogs.map((data, index) => {
                        return(
                            <EachBlog blogdata={{"eachBlog": data}}/>                            
                        )
                    })}
                    
                </div>
            : <NoBlog />
            
            }
            </>:<ReactLoading style={{ color: "black", margin: "auto", height: "20%", width: "20%" }} type={"spinningBubbles"} />
            
        )
    }
}

export default CategoryBlog;