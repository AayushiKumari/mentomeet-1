import React, { Fragment } from "react";
import { Link } from 'react-router-dom'

import brand from '../assets/brand.png'

import '../css/footer.css';

class Footer extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token')
  }
  render() {
    return (
      <Fragment>
        <footer id="footer">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <h3>MentoMeet</h3>
                <ul class="social-links">
                  <li><Link to="/mentee">Careers</Link></li>
                  <li><Link to="/blogs">Blogs</Link></li>
                  <li><Link to="/mentor">Be a mentor</Link></li>
                  <li><Link to="/mentee">Be a Mentee</Link></li>
                  <li>FAQs</li>
                  <li>About us</li>
                </ul>
              </div>
              <div className="col-sm-6">
                <div className="join-us">
                  <div>
                  <h3 style={{ margin: "0 12px 12px 12px" }}>Join our Newsletter</h3>
                  <form className="join-us-form">
                    <input className="form-control" placeholder="Enter your Email" />
                    <button className="btn btn-warning" type="submit">Submit</button>
                  </form>
                  <div className="contact-details">
                  <p>Feel free to contact us</p>
                  <div className="row">
                    <div className="col text-success">9811567932</div>
                    <div className="col text-success">contact@mentomeet.com</div>
                  </div>
                  </div>
                  </div>
                  
                  <div class="copyright" style={{ textAlign: "center", marginTop: "auto" }} >
                    <a className="text-warning w-100 text-center" href="index">Copyright &copy; MentoMeet 2020</a>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </footer >
      </Fragment >
    )
  }
}

export default Footer;