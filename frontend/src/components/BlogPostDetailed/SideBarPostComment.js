import React from 'react'
import TabContent from './TabContent'
import Nav from './Nav'

export default function SideBarPostComment(){
    return(
        <div id='post-comment' className='mt-4 '> 
          <Nav data={['Posts','Comments','Tags']}/> 
          <TabContent/>
        </div> 
    )
}