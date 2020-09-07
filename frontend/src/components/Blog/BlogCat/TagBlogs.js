import React, {Component} from 'react'
import Axios from 'axios'

import EachBlog from "./EachBlog"
import NoBlog from "./NoBlog"

class CategoryBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            tag: this.props.match.params.tag,
            allBlogs : [],
            isDataReturned: false
        }
    }

    componentDidMount(){
        Axios.get(`http://${window.location.hostname}:5005/blogs/tag/`+this.state.tag).then(allBlogs => {
            console.log(allBlogs);
            this.setState({
                allBlogs: allBlogs.data,
                isDataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })
    }
    

    render(){
        return(                
            this.state.isDataReturned && this.state.allBlogs.length > 0 ?             
                <div>
                    {this.state.allBlogs.map((data, index) => {
                        return(
                            <EachBlog blogdata={{"eachBlog": data}}/>                            
                        )
                    })}
                    
                </div>
            : <NoBlog />
        )
    }
}

export default CategoryBlog;