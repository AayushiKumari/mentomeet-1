import React from 'react'
import Tab from './Tab'

export default function TabContent(){
    return(
        <div className="tab-content" id="nav-tabContent">
            <Tab data={{id:'nav-posts',ariaLabelledBy:'nav-post-tab'}}/>
            <Tab data={{id:'nav-comments',ariaLabelledBy:'nav-comments-tab'}}/>
            <Tab data={{id:'nav-tags',ariaLabelledBy:'nav-tags-tab'}}/>
       </div>
    )
}