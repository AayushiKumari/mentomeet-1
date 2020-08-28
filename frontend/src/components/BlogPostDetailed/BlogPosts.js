import React from 'react'
import Post from './Post'

import personOnPhone from '../../img/cheerful-black-male-entrepreneur-talking-on-smartphone.png'



export default function BlogPosts(){
    return(
        <div className='col-12 col-lg-9'>
            <Post data={{
                title:'Welcome to Mentomeet!',
                description:'As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren’t hard enough, Edie finds herself unemployed and invited into Eric’s home—though not by Eric. She becomes a hesitant ally to his wife and a de facto role model to his adopted daughter. Edie may be the only Black woman young Akila knows. Irresistibly unruly and strikingly beautiful, razor-sharp and slyly comic, sexually charged and utterly absorbing, Raven Leilani’s Luster is a portrait of a young woman trying to make sense of her life—her hunger, her anger—in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent, and the unexpected influences that bring us into ourselves along the way.',
                imgUrl:personOnPhone
            }}/>
            <Post data={{
                title:'Get the Best Mentorship',
                description:'As if navigating the constantly shifting landscapes of contemporary sexual manners and racial politics weren’t hard enough, Edie finds herself unemployed and invited into Eric’s home—though not by Eric. She becomes a hesitant ally to his wife and a de facto role model to his adopted daughter. Edie may be the only Black woman young Akila knows. Irresistibly unruly and strikingly beautiful, razor-sharp and slyly comic, sexually charged and utterly absorbing, Raven Leilani’s Luster is a portrait of a young woman trying to make sense of her life—her hunger, her anger—in a tumultuous era. It is also a haunting, aching description of how hard it is to believe in your own talent, and the unexpected influences that bring us into ourselves along the way.',
                imgUrl:personOnPhone
            }}/>
        </div>
    )
}