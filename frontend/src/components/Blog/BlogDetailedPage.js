import React, { Component } from 'react'
import BlogPosts from './BlogPosts'
import BlogSideBar from './BlogSideBar'

export default class BlogDetailedPage extends Component{
  
    render(){
        return(
            <section className='row container-fluid container-md mx-auto my-5'>
                <BlogPosts/>
                <BlogSideBar/>
            </section>
        )
        
    }

            
}
   