import React from 'react'
import '../../sass/BlogList/BlogPost.scss'


export default function BlogPost(props){
    return(
        <div className='col-12 col-md-6 col-lg-4 mt-4 mt-md-5'>
            <div className="card"  id="column">
            <img src={props.data.imgUrl} class="card-img-top" alt="..."></img>
            <div className="card-body pb-2 d-flex flex-column justify-content-between">
                <div>
                <a href='#' className="card-title h6">{props.data.title}</a>
                <div className='details mt-2 d-flex justify-content-between'>
                    <p className="card-text text-muted d-block">Added to <a href="#" className='category'>{props.data.category}</a></p>
                    <p className='d-block text-muted' >{props.data.date}</p>
                </div>
                </div>
            
                
                <div className='author pt-2  d-flex justify-content-start align-items-center'>
                    <img className='d-block' src={props.data.author.imgUrl}></img>
                    <p className='d-block ml-1'><span className='text-muted' >BY</span> {props.data.author.name}</p>
                </div>
            </div>
        </div>
        </div>
    )
}