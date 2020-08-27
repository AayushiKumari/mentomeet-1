import React from 'react'
import '../../sass/NavPost.scss'

export default function NavPost(props){
    return(
        <div id='nav-post' className='post row no-gutters px-2'>
            <div className='col-2 d-flex align-items-center justify-content-center'>
                <img className='d-block' src={props.data.imgUrl}></img>
            </div>

            <div className='post-title pl-2 col-10 d-flex flex-column align-items-start justify-content-center'>
                <h5 className='d-block mb-0'>{props.data.title}</h5>
                <p className='d-block mb-0'>{props.data.date}</p>
            </div>
        
        </div>
    )
}