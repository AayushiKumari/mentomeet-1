import React from 'react'

import '../sass/WhyChooseMentomeet.scss'

import whyMentomeet from '../assets/img/Why Mentomeet@2x.png'
import vLine from '../assets/img/Rectangle 42@2x.png'
import vLineS from '../assets/img/Rectangle 44.png'
import teachers from '../assets/final assets/100%Free.png'
import mentors from '../assets/final assets/mentors.png'
import solution from '../assets/final assets/solutions.png'
import students from '../assets/final assets/soln.png'


export default function WhyChooseMentomeet(){
    return(
        <div id='why-choose-mentomeet' className='container-fluid row my-4 my-md-5 justify-content-center align-items-center'>
            <div id='left-col' className='col-12 my-5 my-lg-0 col-lg-6 d-flex align-items-center '>
                <div className='box ml-5 d-flex flex-row justify-content-start align-items-center'>
                    <img id='v-line' className='d-block' src={vLine} alt=""></img>
                    <img className='d-block ml-2' src={whyMentomeet} alt="" ></img>
                </div>
                
            </div>
            <div id='right-col' className='col-12 col-lg-6 row'>
                <div className='col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='box-s d-flex flex-row justify-content-center align-items-center'>
                        <img className='d-block vLineS' src={vLineS} alt="" ></img>
                        <img className='d-block' src={teachers} alt="" ></img>
                    </div>
                    
                </div>
                <div className='col-12 mt-4 mt-sm-0 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='box-s d-flex flex-row justify-content-center align-items-center'>
                        <img className='d-block vLineS' src={vLineS} alt="" ></img>
                        <img className='d-block' src={mentors} alt="" ></img>
                    </div>
                    
                </div>
                <div className='col-12 col-sm-6 mt-4 mt-sm-5 d-flex align-items-center justify-content-center'>
                    <div className='box-s d-flex flex-row justify-content-center align-items-center'>
                        <img className='d-block vLineS' src={vLineS} alt=""></img>
                        <img className='d-block' src={solution} alt=""></img>
                    </div>
                   
                </div>
                <div className='col-12 col-sm-6 mt-4 mt-sm-5 d-flex align-items-center justify-content-center'>
                    <div className='box-s d-flex flex-row justify-content-center align-items-center'>
                        <img className='d-block vLineS' src={vLineS} alt=""></img>
                        <img className='d-block' src={students} alt=""></img>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}