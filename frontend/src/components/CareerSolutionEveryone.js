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
                                <div className='bullet' ></div><p>One to one Advice</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>24X7 Assistance</p>
                            </div>
                            <div className='li-item'>
                                <div className='bullet' ></div><p>Logical Learning</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>Mentors From IIT/NIT</p>
                            </div>
                            <div className='li-item'>
                                <div className='bullet' ></div><p>Study Material</p>
                            </div>
                            
                        </div>
                        <a href='/mentors/jee' className='explore d-block' src='#'>Explore</a>
                    </div>
                </div>
                <div className='big-brother col-md-4 mt-4 mt-sm-0 col-12 col-sm-6 d-flex align-items-center justify-content-center'>
                    <div className='sm-brother  py-2  px-4 d-flex flex-column align-items-start justify-content-between'>
                        <h2 className='d-block'>NEET</h2>
                        <div>
                            <div className='li-item'>
                                <div className='bullet' ></div><p>Mentors From AIIMS</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>Time Management</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>One to One Advice</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>24X7 Assistance</p>
                            </div>
                            <div className='li-item'>
                                <div></div><p>Study Material</p>
                            </div>
                        </div>
                        <a href='/mentors/neet' className='explore d-block' src='#'>Explore</a>
                    </div>
                </div>
                <div className='big-brother col-md-4 mt-4 mt-md-0 col-12 d-flex align-items-center justify-content-center'>
                    <div className='sm-brother py-2  px-4 d-flex flex-column align-items-start justify-content-between'>
                        <h2 className='d-block'>COLLEGE</h2>
                        <div>
                            <div className='li-item'>
                                <div className='bullet' ></div><p>Mock Placement</p>
                            </div>
                            <div className='li-item'>
                            <div className='bullet' ></div><p>Talk with PPOs</p>
                            </div>
                    
                            <div className='li-item'>
                            <div className='bullet' ></div><p>Skill Development</p>
                            </div>
                            <div className='li-item'>
                            <div className='bullet' ></div><p>Personal Guidance</p>
                            </div>
                            <div className='li-item'>
                            <div className='bullet' ></div><p>Internship Occasion</p>
                            </div>
                        </div>
                        <a href='/mentors/career' className='explore d-block' src='#'>Explore</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
