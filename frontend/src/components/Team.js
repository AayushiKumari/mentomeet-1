import React from "react";
import {Link} from 'react-router-dom'
import FadeIn from 'react-fade-in';
import {
    Button,
    Alert,
    Container,
    Row,
    Col
  } from "reactstrap";

import avatar from '../assets/default-avatar.png';
// import default from '../assets/default-avatar.png';

var arr = [
  {
    src: require('../assets/members/abdul.jpg'),
    name: "Abdulahad Khan",
    position: "Management,Developer",
    college:"IIT Roorkee",
  },

{
    src: require('../assets/members/virendra.jpg'),
    name: "Virendra Lohia",
    position: "Management",
    college:"NIT Hamirpur",
  },
{
    src: require('../assets/members/ajay.jpg'),
    name: "Ajay Dayma",
    position: "Management,Developer",
    college:"IIT Roorkee",
  },
{
    src: require('../assets/members/abhishek.jpg'),
    name: "Abhishek Gupta",
    position: "Lead Developer",
    college:"Birla College, Maharastra",
  },

{
    src: require('../assets/members/abhinav.jpg'),
    name: "Abhinav Saini",
    position: "Business Analyst",
    college:"PEC Chandigarh",
  },

{
    src: require('../assets/members/viru.png'),
    name: "Prasoon Kumar Gupta",
    position: "UI/UX Designer",
    college:"NIT Hamirpur",
  },

{
    src: require('../assets/default-avatar.png'),
    name: "Priyam Seth",
    position: "Developer",
    college:"IIT Mandi",
  },


{
    src: require('../assets/members/rohit.jpg'),
    name: "Rohit Bhamu",
    position: "Business Development",
    college:"IIT Mandi",
  },

{
    src: require('../assets/members/siddharth.jpg'),
    name: "Siddharth Choudhary",
    position: "Digital Marketing",
    college:"NIT Hamirpur",
  },

{
    src: require('../assets/members/yash.jpg'),
    name: "Agrawal Yash",
    position: "Content Writer",
    college:"NIT Hamirpur",
  },

{
    src: require('../assets/members/vidhi.png'),
    name: "Vidhi Shekhawat",
    position: "Operations",
    college:"NIT Hamirpur",
  },
{
    src: require('../assets/members/subash.png'),
    name: "Subhash Samota",
    position: "Marketing",
    college:"NIT Kurukshetra",
  },
{
    src: require('../assets/members/bharat.jpg'),
    name: "Bharat Garg",
    position: "Social Media Handling",
    college:"PEC Chandigarh",
  },   
{
    src: require('../assets/members/rajat.png'),
    name: "Rajat Uba",
    position: "Bussiness Development",
    college:"IIT Roorkee",
  }
]

class Mentor extends React.Component {
    handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }





    render() {
        return (
            <div className="section section-team text-center title" style={{background:"white", color:"white", border:"5px solid white", borderRadius:"10px"}} id="team">
          <Container>
            <h1 className="title font-weight-bold text-warning">Our Team</h1>
            <div className="team"  style={{zIndex:"-100"}} >
              <FadeIn>
              <Row  style={{zIndex:"-100"}} >
                {arr.map(teamMember=> {
                  return(
                    <Col lg="4" md="4" style={{paddingTop:"50px"}}>

                      <div className="team-player">
                        <div className="flip-box flip-box-team">
                          <div className="flip-box-inner flip-box-inner-team" style={{opacity:"1"}}>
                            <div className="flip-box-front" style={{backgroundColor:"#fff",opacity:"1"}}>
                              <img
                                alt={teamMember.name}
                                className="rounded-circle img-fluid img-raised"
                                src={teamMember.src}
                                style={{maxWidth:"180px", maxHeight:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                              ></img>
                            </div>
                            <div className="flip-box-back" style={{backgroundColor:"rgba(0,0,0,0)",opacity:"1"}}>
                              <img 
                                alt={teamMember.name}
                                className="rounded-circle img-fluid img-raised"
                                src={teamMember.src}
                                style={{maxWidth:"180px", maxHeight:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                              ></img>  
                            </div>
                          </div>
                        </div>
                          
                        
                        <h4 className="title text-warning mt-5">{teamMember.name}</h4>
                        <p className="category mb-2 text-info">{teamMember.position}</p>
                        <h5 className="title text-success mt-1"> {teamMember.college} </h5>
                        
                      </div>
                    </Col>
                  );
                })}
      
              </Row>
              <hr />
              <Row style={{color:"black", textAlign:"center"}}>
                <Col md={12}>
                 
                </Col>
                <Col>
                  <Alert color="success"> <h3>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8tDDT3bT3-1k4fudBRmor1A2oJ3XkIbxyaC5Wr8q7bavWUQ/viewform" target="_blank">Join us. </a>
                  </h3>Let's make stuff together,we are looking for talented and passionate creative people to join our Team.</Alert>
                </Col>
              </Row>
              </FadeIn>
            </div>
            
          </Container>
          {/* <ParticlesBg type="custom" config={config} bg={true} style={{position:"absolute",zIndex:"100",top:"0", left:"0"}}/> */}
        </div>
        )
    }
}

export default Mentor;
