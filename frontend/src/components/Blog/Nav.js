import React from 'react'
import '../../sass/Nav.scss'

export default function Nav(props){
    return(
        <nav id='nav'>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <a className="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-posts" role="tab" aria-controls="nav-post" aria-selected="false">{props.data[0]}</a>
                <a className="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-comments" role="tab" aria-controls="nav-comments" aria-selected="false">{props.data[1]}</a>
                <a className="nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-tags" role="tab" aria-controls="nav-tags" aria-selected="false">{props.data[2]}</a>
            </div>
      </nav>
    )
}