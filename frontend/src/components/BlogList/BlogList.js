import React from 'react'
import BlogPost from './BlogPost'

import '../../sass/BlogList/BlogList.scss'

import resTable from '../../img/restaurant-table.jpg'
import bulb from '../../img/pendant-bulb.jpg'
import cook from '../../img/restaurant-cook.jpg'
import iftekharRiyad from '../../img/Iftekhar-Riyad.jpg'

export default function BlogList(){
    return(
        <div id='container' className='container-fluid container-md my-5'>
             <div className='my-5 row px-2 px-sm-5 px-md-3 px-lg-3 flex-wrap'>
            <BlogPost
            data={{
                title:'Go for what you love',
                category: 'Video',
                author:{
                    name:'AWWWARDS',
                    imgUrl:iftekharRiyad
                },
                imgUrl:resTable,
                date:'December 12, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'If you want something in life, just reach out and grab it.',
                category: 'Motivation',
                author:{
                    name:'Christopher McCandless',
                    imgUrl:iftekharRiyad
                },
                imgUrl:bulb,
                date:'September 2, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'My blog post title ideas are finished!',
                category: 'Unknown',
                author:{
                    name:'Iftekhar Riyad',
                    imgUrl:iftekharRiyad
                },
                imgUrl:cook,
                date:'July 8, 2020'
            }}
            />

            <BlogPost
            data={{
                title:'Go for what you love',
                category: 'Video',
                author:{
                    name:'AWWWARDS',
                    imgUrl:iftekharRiyad
                },
                imgUrl:resTable,
                date:'December 12, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'If you want something in life, just reach out and grab it.',
                category: 'Motivation',
                author:{
                    name:'Christopher McCandless',
                    imgUrl:iftekharRiyad
                },
                imgUrl:bulb,
                date:'September 2, 2019'
            }}
            />
            <BlogPost
            data={{
                title:'My blog post title ideas are finished!',
                category: 'Unknown',
                author:{
                    name:'Iftekhar Riyad',
                    imgUrl:iftekharRiyad
                },
                imgUrl:cook,
                date:'July 8, 2020'
            }}
            />
         
        </div>
    </div>
       
    )
}