import React from "react";
import { Link } from 'react-router-dom'

import brand from '../assets/brand.png'

import Dialog from '@material-ui/core/Dialog';
import { Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openFAQ: false,
    }
  }

  handleClose = () => {
    this.setState({
      openFAQ:false
    });
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = "/index"
    // window.location.href = "/login"
  }
  handleopenFAQ = () => {
    this.setState({openFAQ:true})
  }
  render() {
    return (
      <>
      {/* FAQs dialog or modal */}
      <Dialog
      open={this.state.openFAQ}
      TransitionComponent={Transition}
      keepMounted
      onClose={this.handleClose}
      aria-labelledby="FAQs"
      aria-describedby="MentoMeet"
      fullWidth={true}
      maxWidth = {'lg'}
    >
      <DialogTitle >Frequently Asked Questions:</DialogTitle>
      <DialogContent>
        <DialogContentText >
            <hr />
            <h5>1. How is MentoMeet different from career guidance programs ?</h5>
            <p>MentoMeet is the next gen 1:1 mentoring platform in India  bringing together renowned mentors and mentees who need mentoring. It is for NEET & JEE Aspirants.</p>

            <hr />
            <h5>
            2. What is MentoMeet?</h5>
            <p>
            MentoMeet is an EdTech startup which aims to connect school/Coaching students to India's top institutes (IIT, NIT, AIIMS) Students Which provides constructive guidance and solves their queries.MentoMeet is the next gen 1:1 mentoring platform in India
            ,bringing together renowned mentors and mentees who need mentoring.</p>
            <hr />
            <h5>
            3. How does MentoMeet work ?</h5>
            <p>Sign up on MentoMeet as a mentee and choose your section(JEE/NEET).  Choose a relevant mentor which is available in the mentor section and. Take up the mentorship program with the mentor and whoosh… crack the JEE/NEET..</p>
            <hr />
            <h5>
            4. I already have a Teacher assigned at coaching, why should I sign up at MentoMeet ?</h5>
            <p>Our Mentors are from premier institutes of India like IITs, NITs, AIIMSs and other top universities.who have faced the same problems which you are facing right now. they will provide you their own experience,strategies. It's going to definitely help you crack the JEE,NEET & AIIMS exam.</p>
            <hr />
            <h5>
            5. How do I stay in touch with my mentors ?</h5>
            <p>MentoMeet enables you to stay in touch with your mentor all the time. You can SMS, schedule a call and have a voice chat with your mentor, all through the platform.</p>
            <hr />
            <h5>
            6. How does MentoMeet ensure the quality of the program ?</h5>
            <p>All the mentoring programs are being closely monitored by our panel of observers who ensure the quality of programs and also assist in recalibration if the mentee needs assistance.</p>
            <hr />
            <h5>
            7. Is it Free?</h5>
            <p>Yes, It is absolutely Free.</p>
            <hr />
            <h5 className="text-dark mb-3">How it works:</h5>
            <h5>
            ✨Sign Up For Free</h5>
            <p>Signup on the MentoMeet and create your profile.</p>
            <hr />
            <h5>
            🌟Set your Section</h5>
            <p>Choose your section(NEET/JEE) </p>
            <hr />
            <h5>
            ⭐Find a Mentor</h5>
            <p>Complete your profile, Choose your section & we will find the best suitable mentor for you.you can explore BLOGS, Q&A etc.</p>
            <hr />
            <h5>
            ⭐Live Interaction</h5>
            <p>Begin your Mentorship program with the mentor</p>
            <hr />
            <h5>
            🌟Track Progress</h5>
            <p>Keep tracking your progress by our mentors</p>
            <hr />
            <h5>
            🌟Review by Experts</h5>
            <p>Experts review the progress, keep interacting with the mentor and mentee</p>
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          close
      </Button>
      </DialogActions>
    </Dialog>

      <nav className="navbar shadow  navbar-expand-lg sticky-top navbar-light bg-light">
        {/* <Link className="navbar-brand text-warning" to="/index"><img src={brand} alt="Brand" width="120"/></Link> */}
        <Link className="navbar-brand text-warning" to="/index"><img src={brand} alt="Brand" width="135" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item different mx-3 font-weight-bold">
              <Link className="nav-link text-warning" to="/index#">HOME</Link>
            </li>
            <li className="nav-item different mx-3 font-weight-bold">
              <a className="nav-link text-warning" href="/index#about">ABOUT US</a>
            </li>
            <li className="nav-item different mx-3 font-weight-bold">
              <Link className="nav-link text-warning" to="/team">OUR TEAM</Link>
            </li>
            {/* <li className="nav-item different mx-3 font-weight-bold dropdown">
              <a className="nav-link text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                STUDENTS
                            </a>
            </li> */}
            <li className="nav-item different mx-3 font-weight-bold dropdown">
              <a className="nav-link text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                MENTORS
                            </a>
              <div className="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdown">
                <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/mentors">OUR MENTORS</Link>

              </div>
            </li>
            <li className="nav-item different mx-3 font-weight-bold dropdown">
              <a className="nav-link text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                RESOURCES
                            </a>

              <div className="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdown">
                {localStorage.getItem('token') ?
                <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/qna">QnA</Link>
                :<Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/login">QnA</Link>
                }
                {localStorage.getItem('token') ?
                <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/blogs">Blogs</Link>
                :<Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/login">Blogs</Link>
                }
                {localStorage.getItem('token') ?
                  <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName + JSON.parse(localStorage.getItem('user')).lastName}&room=General`}>Chat Rooms</Link>
                  : <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/login">Chats</Link>}
                {/* <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/blog">Create Blog</Link> */}
                
                <a className="dropdown-item bg-white my-2 rounded shadow text-info" onClick={this.handleopenFAQ}>FAQs</a>
              </div>
            </li>

            {localStorage.getItem('token') ?
              <>
                {/* <li className="nav-item different mx-3 font-weight-bold">
                  <Link className="nav-link text-info login mb-0" to="/profile" >{JSON.parse(localStorage.getItem('user')).email}</Link>
                </li>
                <li className="nav-item different mx-3 font-weight-bold">
                  <Link className="nav-link text-info login" to="/" style={{ textDecoration: "none" }} onClick={this.handleLogout}>Logout</Link>
                </li> */}
                <li className="nav-item different mx-3 font-weight-bold dropdown">
                  <a className="nav-link text-info" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {JSON.parse(localStorage.getItem('user')).firstName + " " + JSON.parse(localStorage.getItem('user')).lastName}
                                </a>

                  <div className="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdown">
                    
                    <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/profile">My Profile</Link>
                    <Link className="dropdown-item bg-white my-2 rounded shadow text-info" to="/" onClick={this.handleLogout}>Logout</Link>
                  </div>
                </li>
              </>
              :
              <li className="nav-item different mx-3 font-weight-bold">
                <Link className="nav-link text-info login" to="/login">Login</Link>
              </li>

            }

            {/* <a className="nav-link text-info login" href="login">LOGIN</a> */}
          </ul>
        </div>
      </nav>
      </>
    )
  }
}

export default NavBar;