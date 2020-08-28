import React from 'react'
import '../css/CareerSolutionEveryone.css'

export default function CareerSolutionEveryone(){
    return(
        <div id='career-solution-everyone' className='container-lg  py-4'>
            <h1 className='text-center'>Career Solution For</h1>
            <h1 id='everyone' className='text-center' >Everyone</h1>
            <div className='row align-items-start justify-content-center mt-5'>
                <div  className='big-brother col-md-4 col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between'>
                        <h2 className='d-block'>IIT-JEE</h2>
                        <div>
                            <div className='li-item'>
                                <div className='bullet' ></div><p>Personal Guidance</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>Mentors From IIT/NIT</p>
                            </div>
                        </div>
                        <a href='#' className='explore d-block' src='#'><span className='orange' >E</span>xplore</a>
                    </div>
                </div>
                <div className='big-brother col-md-4 mt-4 mt-sm-0 col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='sm-brother  py-2  px-4 d-flex flex-column align-items-start justify-content-between'>
                        <h2 className='d-block'>NEET</h2>
                        <div>
                            <div className='li-item'>
                                <div className='bullet' ></div><p>AIIMS</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>How To Prepare</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>Queries</p>
                            </div>
                        </div>
                        <a href='#' className='explore d-block' src='#'><span className='orange' >E</span>xplore</a>
                    </div>
                </div>
                <div className='big-brother col-md-4 mt-4 mt-md-0 col-12 d-flex align-items-center justify-content-center'>
                    <div className='sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between'>
                        <h2 className='d-block'>SCHOOL</h2>
                        <div>
                            <div className='li-item'>
                                <div className='bullet' ></div><p>Personal Guidance</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>Mentors From IIT/NIT</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>AIIMS</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>How To Prepare</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>Queries</p>
                            </div>
                        </div>
                        <a href='#' className='explore d-block' src='#'><span className='orange' >E</span>xplore</a>
                    </div>
                </div>
            </div>
        </div>
    )
}