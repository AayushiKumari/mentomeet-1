import React, { Component} from 'react';
import axios from 'axios'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Container, Badge, Card, CardHeader, CardBody, Row, Col, CardFooter
  } from 'reactstrap';
// import { Card } from '@material-ui/core';

  
class Announcements extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            activeIndex: 0,
            animating: false,
            dataReturned: false
        }
    }

    getData = async() => {
        axios.get(`http://${window.location.hostname}:5005/admin/announcements/fetch`).then(response => {
            console.log(response);
            console.log("---------------------------------------------------------------")
            this.setState({
                data: response.data,
                dataReturned: true
            })
        }).catch(error => {
            console.log("Axios error")
            console.log(error)
        })

        // this.setState({data:dataReceived.data, dataReceived:true});
    }
    async componentDidMount(){
        await this.getData();
    }
    render() { 
        // console.log(this.state.data)
        return ( 
            // <Container>
                <div id='career-solution-everyone' className='container-lg  py-4'>
                    <h1 className='text-center'>Announcements</h1>
                    <div className='my-5'>
                    {/* <div className='row align-items-start justify-content-center mt-5'> */}
                        {this.state.dataReturned ? 
                        <>
                            
                        {this.state.data.length!==0 ?
                            <Row className="align-items-start justify-content-center">
                                    {this.state.data.map((item) => {
                                        return (
                                            <Col lg={4} md={6}>
                                                <Card>
                                                    <CardHeader>
                                                        <h5 className="mb-0 font-weight-bold">{item.eventName} </h5>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <p className="font-weight-bold">Mode: <Badge color="success">{item.mode}</Badge></p>
                                                        <p className="font-weight-bold">Date: <span className="text-muted">{item.date}</span> , Time: <span className="text-muted">{item.time}</span> </p>
                                                        <p><a className="btn btn-info btn-sm" href={item.link} target="_blank"> Register Here</a></p>
                                                        {item.description ? <p className="text-muted">{item.description}</p> : ""}
                                                    </CardBody>
                                                    <CardFooter><span className="font-weight-bold">Checkout Latest Seminar:</span> <a className="btn btn-info btn-sm" href={item.contact} target="_blank">Join Us</a></CardFooter>
                                                </Card><hr />
                                            </Col>
                                            
                                        );
                                    })}
                            </Row>
                        :<>Fetching Data...</>
                        }                               

                </> : <>.,.</>}
                    </div>
                </div>
            // </Container>
        );
    }
}
 
export default Announcements;
