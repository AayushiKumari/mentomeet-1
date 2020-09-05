import React from 'react'
import '../../sass/BlogSideBar.scss'
import BlogSideBarCard from './BlogSideBarCard'
import SideBarPostComment from './SideBarPostComment'


export default function BlogSideBar(props){
    return(
      <div id='blog-side-bar' className='col-lg-3 col-12 mt-4 mt-lg-0'>
          <BlogSideBarCard/>
          <SideBarPostComment/>
     </div>
    )
}