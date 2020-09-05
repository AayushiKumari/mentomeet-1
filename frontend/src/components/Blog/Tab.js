import React from 'react'
import NavPost from './NavPost'
import iftekhaRiyad from '../../img/Iftekhar-Riyad.jpg'

export default function Tab(props){
    let classForTab;
    if(props.data.id==='nav-posts'){
        classForTab='tab-pane fade show active'
    }else{
        classForTab='tab-pane fade show'
    }
    //Need to add conditional rending here. No matter the Tab this code is rendering only post.
    return(
        <div className={classForTab} id={props.data.id} role="tabpanel" aria-labelledby={props.data.areaLabelledBy}>
           <NavPost data={{
               title:'This is the first post',
            //    imgUrl:iftekhaRiyad,
               date:"February 10, 1996"
               }}/>
           <NavPost data={{
               title:'This is the Second post',
             //  imgUrl:iftekhaRiyad,
               date:"January 21, 1997"
               }}/>
            <NavPost data={{
               title:'This is the third post',
              // imgUrl:iftekhaRiyad,
               date:"May 1, 2020"
               }}/>
            <NavPost data={{
               title:'This is the fourth post',
              // imgUrl:iftekhaRiyad,
               date:"September 3, 2002"
               }}/>
       </div>
    )
}