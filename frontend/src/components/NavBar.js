import React from "react";

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar shadow  navbar-expand-lg sticky-top navbar-light bg-light">
                <a className="navbar-brand text-warning" href="index">MentoMeet</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="#">STUDENTS <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="qna">MENTORS</a>
                        </li>
                        <li className="nav-item mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="#about">ABOUT US</a>
                        </li>                        
                        <li className="nav-item mx-3 font-weight-bold dropdown">
                            <a className="nav-link text-warning" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            RESOURCES
                            </a>
                            <div className="dropdown-menu bg-transparent border-0" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item bg-white my-2 rounded shadow text-info" href="#">Downloads</a>
                                <a className="dropdown-item bg-white my-2 rounded shadow text-info" href="#">Blogs</a>
                                <a className="dropdown-item bg-white my-2 rounded shadow text-info" href="#">Webinar</a>
                                <a className="dropdown-item bg-white my-2 rounded shadow text-info" href="#">Experience</a>
                            </div>
                        </li>
                        <li className="nav-item mx-3 font-weight-bold">
                            <a className="nav-link text-info" href="#">LOGIN</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBar;