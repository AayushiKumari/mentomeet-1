import React, {Component} from 'react'
import Axios from 'axios'

import EachBlog from "./EachBlog"

class NoBlog extends Component{
    
    render(){
        return(                
            <div class="card my-3 p-5 text-center">
                <h4 className="text-muted font-weight-bold">No Blogs Yet</h4>
            </div>
        )
    }
}

export default NoBlog;