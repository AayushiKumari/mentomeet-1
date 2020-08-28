import React from 'react'

import '../sass/BeyondMentorship.scss'
import {Card, CardHeader, CardBody, Row, Col} from 'reactstrap';

// import community from '../assets/img/Rectangle 33.png'
// import qa from '../assets/img/Rectangle 34.png'
// import seminar from '../assets/img/Rectangle 35.png'

export default function WordFromStudents(){
    return(
        <div id='beyond-mentorship' className='container my-3 my-lg-5 py-4 py-lg-4 py-2'>
            <h1 className='text-center'>Word From Students</h1>
            <div className='col-12 col-md-12  d-flex justify-content-center'>
                    <div className='square px-1 pb-1 w-100 d-flex flex-column justify-content-end align-items-center'>
                        {/* <img className='d-block' src={community} alt='team icon'></img> */}
                        <p><span className='orange'>C</span>ommunity <br></br> Buildup</p>
                    </div>

                </div>
            <Card>
                <CardHeader>Students Name1</CardHeader>
                <CardBody>
                    <Row>
                        <Col md={2}>
                            Image
                        </Col>
                        <Col md={10}>
                            Text Content
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
}