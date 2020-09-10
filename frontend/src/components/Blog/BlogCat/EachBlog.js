import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'

import avatar from '../../../assets/default-avatar.png'

// import {setQDate} from "../../CommonFunc/common.js"
import {setQDate} from "../../CommonFunc/common.js"

class EachBlog extends Component{
    constructor(props){
        super(props)
        this.state = {
            blog : this.props.blogdata.eachBlog,
            author: JSON.parse(this.props.blogdata.eachBlog.author),
            currUser: JSON.parse(localStorage.getItem('user')),
            vote: "text-info"
        }
        
    }    

    render(){
        return(
            <div class="card my-3">
                { this.state.blog.body_image? <img class="card-img-top w-100" src={this.state.blog.body_image} alt="alternate image" style={{"width":"100%", "maxHeight":"20rem"}} />: "" }
                <Link to={`/blogs/view/${this.state.blog._id}`} className="text-decoration-none">
                <div class="card-body">
                    <div className="mb-0">
                        <h6 className="card-text font-weight-bold mb-0 text-dark">{this.state.blog.title}</h6>
                        <div className="d-flex">
                            <p className="small font-weight-bold text-warning mr-2">{this.state.blog.category}</p>
                            <p className="text-muted small font-weight-bold">{this.state.blog.tag}</p>
                        </div>
                        
                    </div>
                    <h6 class="card-title small text-muted text-justify">
                        {(this.state.blog.body_text).substr(0, 250)}...
                    </h6>
                    
                    
                </div>
                </Link>
                <div className="card-footer bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className='d-flex align-items-center'>
                            <img className='rounded-circle border border-warning' src={avatar} width="30" height="30"/>
                            <h6 className='ml-2 mb-0 small font-weight-bold'><span className='text-muted' >by</span> {this.state.author.firstName},</h6>
                            <h6 className='ml-1 mb-0 small text-muted'>{setQDate(this.state.blog.date)}</h6>
                        </div>
                        <div >
                            <h6 className="text-muted small font-weight-bold mb-0">{this.props.blogdata.eachBlog.likes.length} votes</h6>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EachBlog;