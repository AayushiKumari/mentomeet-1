import React from 'react'
import {Container} from 'react-bootstrap'
import '../css/WhyChooseUs.css'
import destination from '../assets/img/Rectangle 23.png'
import hastleFree from '../assets/img/Rectangle 24.png'
import videoCall from '../assets/img/Rectangle 25.png'
import askQueries from '../assets/img/Rectangle 26.png'

export default function WhyChooseUs(){
    return(
      <Container  varient={'bg-primary'} id='why-choose-us' className='mt-5'>
         <h1 className='text-center'><span className='orange' >Why Choose Us?</span></h1>
         <div id='whchus-row' className='row align-items-start justify-content-center'>
                <div  className='bg-brother col-lg-3 col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='s-brother py-2  px-4 d-flex flex-column align-items-center justify-content-center'>
                        <img className='d-block ' src={destination} alt='destination'></img>
                         <p className='d-block'>One Stop Solution</p>
                    </div>
                </div>
                <div className='bg-brother col-lg-3 mt-5 mt-sm-0 col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='s-brother  py-2  px-4 d-flex flex-column align-items-center justify-content-center'>
                        <img className='d-block ' src={hastleFree} alt='destination'></img>
                        <p className='d-block'>Hassle Free</p>
                    </div>
                </div>
                <div className='bg-brother col-lg-3 mt-5 mt-lg-0 col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='s-brother py-2  px-4 d-flex flex-column align-items-center justify-content-center'>
                        <img className='d-block ' src={videoCall} alt='destination'></img>
                        <p className='d-block'>Video Call With Experts</p>
                     </div>
                </div>
                <div className='bg-brother col-lg-3 mt-5 mt-lg-0 col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='s-brother py-2  px-4 d-flex flex-column align-items-center justify-content-center'>
                        <img className='d-block ' src={askQueries} alt='destination'></img>
                        <p className='d-block'>Ask Your Queries</p>
                     </div>
                </div>
            </div>
          <a className='d-block mx-auto' id='btn-speak' href='/mentors'>Speak To Us</a>
      </Container>

//    <div classNameName='container' id="why-choose-us">
//       <div classNameName='row '
//          <div className='col-12 col-sm-6 col-md-6 col-lg py-0 py-lg-5  square d-flex flex-column align-items-center justify-content-center' >
//          <img className='d-block ' src={destination} alt='destination'></img>
//    //              <p className='d-block'><span className='orange' >O</span>ne Destination For All Guidance</p>
//          </div>
//          <div className='col-12 col-sm-6 col-md-6 col-lg py-0 py-lg-5  square d-flex flex-column align-items-center justify-content-center' >
//          <img className='d-block' src={destination} alt='destination'></img>
//    //              <p className='d-block'><span className='orange' >O</span>ne Destination For All Guidance</p>
//          </div>
//          <div className='col-12 col-sm-6 col-md-6 col-lg py-0 py-lg-5  square d-flex flex-column align-items-center justify-content-center' >
//          <img className='d-block' src={destination} alt='destination'></img>
//    //              <p className='d-block'><span className='orange' >O</span>ne Destination For All Guidance</p>
//          </div>
//          <div className='col-12 col-sm-6 col-md-6 col-lg py-0 py-lg-5 ml-sm-2 square d-flex flex-column align-items-center justify-content-center' >
//          <img className='d-block' src={destination} alt='destination'></img>
//    //              <p className='d-block'><span className='orange' >O</span>ne Destination For All Guidance</p>
//          </div>
//       </div>
//    </div>
        
    )
}