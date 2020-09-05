import React from 'react'
import '../../sass/Post.scss'

export default function Post(props){
    return(
        <div id='post' className="card mb-3">      
            
            <img src={props.data.imgUrl} className="card-img-top" alt="..."></img>

            <div id='post-body' className="card-body">
                <h2 id='post-title' className="card-title text-center">{props.data.title}</h2>
                {/* <span id="H-line" className='b-block mx-auto'></span> */}
                <p  className="card-text pt-2">{props.data.description}</p>
                <a href="#" className="btn btn-outline-secondary btn-block">Continue Reading</a>
            </div>
        
        </div>
    )
}