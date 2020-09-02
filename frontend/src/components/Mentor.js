import React from "react";
import {Link} from 'react-router-dom'
import {
    Button,
    // Input,
    // InputGroupAddon,
    // InputGroupText,
    // InputGroup,
    Container,
    Row,
    Col
  } from "reactstrap";

import avatar from '../assets/default-avatar.png';
// import default from '../assets/default-avatar.png';

var arr = [
    {
        src: avatar,
        name: "Dinkey Mahawar",
        fbLink:"https://www.facebook.com/profile.php?id=100013816158199",
        linkedinLink:"https://www.linkedin.com/in/dinkey-mahawar-13ab67125"
      },
      {
          src: avatar,
          name: "Mahitha Sravani Sathupati",
          fbLink:"https://www.facebook.com/mahithasravani.sathupati",
          linkedinLink:"https://linkedin.com/in/"
        },
        {
          src: avatar,
          name: "Tikesh Kumar Sahuh",
          fbLink:"https://www.facebook.com/tikeshkumar.sahu.336",
          linkedinLink:"https://linkedin.com/in/"
        },
        {
          src: avatar,
          name: "Ayushi Joshi",
          fbLink:"https://www.facebook.com/",
          linkedinLink:"https://linkedin.com/in/"
        },
        {
          src: avatar,
          name: "Lalit Kumar",
          fbLink:"https://www.facebook.com/profile.php?id=100013299780244",
          linkedinLink:"https://linkedin.com/in/"
        },
        {
          src: avatar,
          name: "Anoop",
          fbLink:"https://www.facebook.com/profile.php?id=100009371717274",
          linkedinLink:"https://linkedin.com/in/"
        }
]

class Mentor extends React.Component {
    handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }





    render() {
        return (
            <div className="section section-team text-center title" style={{background:"white", color:"white", border:"5px solid white", borderRadius:"10px"}}>
          <Container>
            <h1 className="title font-weight-bold text-warning">Mentors</h1>
            <div className="team"  style={{zIndex:"-100"}} >
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
                                style={{maxWidth:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                              ></img>
                            </div>
                            <div className="flip-box-back" style={{backgroundColor:"rgba(0,0,0,0)",opacity:"1"}}>
                              <img 
                                alt={teamMember.name}
                                className="rounded-circle img-fluid img-raised"
                                src={teamMember.src}
                                style={{maxWidth:"180px", border:"5px solid white", boxShadow:"15px 15px 30px 30px #ccc", borderRadius:"100%"}}
                              ></img>  
                            </div>
                          </div>
                        </div>
                          
                        
                        <h4 className="title text-warning mt-5">{teamMember.name}</h4>
                        {/* <p className="category text-info">{teamMember.category}</p> */}
                        <Button
                          className="btn-icon btn-round"
                          color="info"
                          href={teamMember.fbLink}
                          target="_blank"
                          // onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-facebook"></i>
                        </Button>
                        <Button
                          className="btn-icon btn-round"
                          color="info"
                          href={teamMember.linkedinLink}
                          target="_blank"
                          // onClick={e => e.preventDefault()}
                        >
                          <i className="fab fa-linkedin"></i>
                        </Button>
                      </div>
                    </Col>
                  );
                })}
      
              </Row>
              
            </div>
            
          </Container>
          {/* <ParticlesBg type="custom" config={config} bg={true} style={{position:"absolute",zIndex:"100",top:"0", left:"0"}}/> */}
        </div>
        )
    }
}

export default Mentor;