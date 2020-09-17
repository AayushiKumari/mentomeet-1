import React, { Component } from 'react';

import '../sass/About.scss'
import Dialog from '@material-ui/core/Dialog';
import { Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";

import team from '../assets/img/Rectangle 59.png'
import journey from '../assets/img/Rectangle 60.png'
import goal from '../assets/img/Rectangle 61.png'

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            openAim: false,
            openJourney:false
        }
    }

    handleClose = () => {
        this.setState({
          openAim: false,
          openJourney: false
        });
    }
    handleAim = () => {
        this.setState({openAim: true})
    }

    handleJourney = () => {
        this.setState({openJourney: true})
    }

    render() { 
        return(
            <div id='about' className='container my-5 py-2'>
                {/* our Aim dialog or modal */}
                <Dialog
                    open={this.state.openAim}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="Terms and conditions"
                    aria-describedby="MentoMeet"
                    fullWidth={true}
                    maxWidth = {'lg'}
                >
                    <DialogTitle >Our Aim</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                        Meet your true mentors through MentoMeet. We introduce you to the world of true mentorship and building blocks for a strong foundation for your bright future. Our team comprising of various elites from prestigious College throughout the country is always ready to give their 100% behind a child's dream so that he can excel in his subjects and clear with flying colours. We aim to reach across the nation; to all the kids who dare to dream big. Let us come together to create a fun teaching and learning experience for both students and mentors.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        close
                    </Button>
                    </DialogActions>
                </Dialog>



                {/* Journey dialog or modal */}
                <Dialog
                    open={this.state.openJourney}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="Terms and conditions"
                    aria-describedby="MentoMeet"
                    fullWidth={true}
                    maxWidth = {'lg'}
                >
                    <DialogTitle >Our Journey</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            <VerticalTimeline>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                                    date="2011 - present"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    // icon={<WorkIcon />}
                                >
                                    <h3 className="vertical-timeline-element-title">Creative Director</h3>
                                    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                                    <p>
                                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                                    </p>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    date="2010 - 2011"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    // icon={<WorkIcon />}
                                >
                                    <h3 className="vertical-timeline-element-title">Art Director</h3>
                                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                                    <p>
                                    Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                                    </p>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    date="2008 - 2010"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    // icon={<WorkIcon />}
                                >
                                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                                    <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                                    <p>
                                    User Experience, Visual Design
                                    </p>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    date="2006 - 2008"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                    // icon={<WorkIcon />}
                                >
                                    <h3 className="vertical-timeline-element-title">Web Designer</h3>
                                    <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                                    <p>
                                    User Experience, Visual Design
                                    </p>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="April 2013"
                                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                    // icon={<SchoolIcon />}
                                >
                                    <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                                    <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                                    <p>
                                    Strategy, Social Media
                                    </p>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="November 2012"
                                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                    // icon={<SchoolIcon />}
                                >
                                    <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                                    <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                                    <p>
                                    Creative Direction, User Experience, Visual Design
                                    </p>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--education"
                                    date="2002 - 2006"
                                    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                    // icon={<SchoolIcon />}
                                >
                                    <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                                    <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                                    <p>
                                    Creative Direction, Visual Design
                                    </p>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                                    // icon={<StarIcon />}
                                />
                                </VerticalTimeline>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        close
                    </Button>
                    </DialogActions>
                </Dialog>

                <h1 className='text-center'>About Us</h1>
                <div className='row my-5 mt-5'>
                    <div className='col-12 col-md  d-flex justify-content-center'>
                        <a href="#team">
                            <div className='square d-flex flex-column justify-content-center align-items-center'>
                                <img className='d-block' src={team} alt='team icon'></img>
                                <p className='d-block'>Our Team</p>
                            </div>
                        </a>
    
                    </div>
                    <div className='col-12 col-md mt-4 mt-md-0 d-flex justify-content-center'>
                        <div className='square d-flex flex-column justify-content-center align-items-center' style={{cursor:"pointer"}} onClick={this.handleJourney}>
                            <img src={journey} alt='journey icon'></img>
                            <p>Our Journey</p>
                        </div>
                    
                    </div>
                    <div className='col-12 mt-4 mt-lg-0 col-md d-flex justify-content-center'>
                        <div className='square d-flex flex-column justify-content-center align-items-center' style={{cursor:"pointer"}} onClick={this.handleAim}>
                            <img src={goal} alt='goal icon'></img>
                            <p>Our Aim</p>
                        </div>
                    
                    </div>
                </div>
            </div>
        )
    }
}
 
export default About;