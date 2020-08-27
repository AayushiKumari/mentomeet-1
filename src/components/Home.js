import React from 'react'
import achive from '../assets/img/Group 6@2x.png'
import talk from '../assets/img/Group 7@2x.png'
import teacher from '../assets/img/Rectangle 6@2x.png'
import video from '../assets/img/Rectangle 15@2x.png'
import mic from '../assets/img/Rectangle 14@2x.png'
import greaterThen from '../assets/img/Rectangle 13.png'
import dialog from '../assets/img/Rectangle 5.png'
import '../css/Home.css'



export default function Home(){
    return(
        <div className='container-fluid  px-4 px-sm-5 py-5 px-md-3'>
            <div id="main-row" className='row'>
                <div id='row' className='col-12 col-sm-6 order-2 order-sm-1 row'>
                    <div className='col position-relative d-flex aling-items-center justify-content-center'>
                        <img className='d-block w-100' src={achive}></img>
                        <img id='video' className='position-absolute' src={video}></img>
                    </div>
                    <div className='col d-flex aling-items-center justify-content-center position-relative'>
                        <img className='d-block w-100' src={talk}></img>
                        <img id='mic' className='position-absolute' src={mic}></img>
                    </div>
                    <img id='greaterThen' className='d-none d-sm-block position-absolute' src={greaterThen}></img>
                </div>
                 
                <div className='col-12 col-sm-6 order-1 order-sm-2 d-flex flex-sm-row aling-items-center justify-content-center justify-content-sm-end'>
                
                    <img id='teacher' className='' src={teacher}></img>
                    <a id='btn-sm-register' className='d-block position-absolute d-sm-none mx-auto mt-4' href='#'>REGISTER</a>
                    <img id='dialog' className='position-absolute' src={dialog}></img>
                </div>
                
            </div>
            <a id='btn-register' className='d-none d-sm-block mx-auto mt-4' href='#'>REGISTER</a>
        </div>
        
    )
}