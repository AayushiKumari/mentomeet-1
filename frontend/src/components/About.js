import React from 'react'

import '../sass/About.scss'

import team from '../assets/img/Rectangle 59.png'
import journey from '../assets/img/Rectangle 60.png'
import goal from '../assets/img/Rectangle 61.png'

export default function About(){
    return(
        <div id='about' className='container my-5 py-2'>
            <h1 className='text-center'>About Us</h1>
            <div className='row my-5 mt-5'>
                <div className='col-12 col-md  d-flex justify-content-center'>
                    <div className='square d-flex flex-column justify-content-center align-items-center'>
                        <img className='d-block' src={team} alt='team icon'></img>
                        <p className='d-block'>Our Team</p>
                    </div>

                </div>
                <div className='col-12 col-md mt-4 mt-md-0 d-flex justify-content-center'>
                    <div className='square d-flex flex-column justify-content-center align-items-center'>
                        <img src={journey} alt='journey icon'></img>
                        <p>Our Journey</p>
                    </div>
                
                </div>
                <div className='col-12 mt-4 mt-lg-0 col-md d-flex justify-content-center'>
                    <div className='square d-flex flex-column justify-content-center align-items-center'>
                        <img src={goal} alt='goal icon'></img>
                        <p>Our Aim</p>
                    </div>
                
                </div>
            </div>
        </div>
    )
}