import React from "react";
import { Link } from 'react-router-dom'

import brand from '../assets/brand.png'

class NavBar extends React.Component {
  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = "/index"
    // window.location.href = "/login"
  }
  render() {
    return (
      <nav className="navbar shadow  navbar-expand-lg sticky-top navbar-light bg-light">
        {/* <Link className="navbar-brand text-warning" to="/index"><img src={brand} alt="Brand" width="120"/></Link> */}
        <Link className="navbar-brand text-warning" to="/index"><img src={brand} alt="Brand" width="120" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item different mx-3 font-weight-bold">
              <a className="nav-link text-warning" href="/index#about">ABOUT US</a>
            </li>
            <li className="nav-item different mx-3 font-weight-bold dropdown">
              <a className="nav-link text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                STUDENTS
                            </a>
            </li>
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
              </div>
            </li>

            {localStorage.getItem('token') ?
              <>
                <li className="nav-item different mx-3 font-weight-bold">
                  <Link className="nav-link text-info login mb-0" to="/profile" >{JSON.parse(localStorage.getItem('user')).email}</Link>
                </li>
                <li className="nav-item different mx-3 font-weight-bold">
                  <Link className="nav-link text-info login" to="/" style={{ textDecoration: "none" }} onClick={this.handleLogout}>Logout</Link>
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
    )
  }
}

export default NavBar;