import React from "react";
import {Link} from 'react-router-dom'

import brand from '../assets/brand.png'

class NavBarLog extends React.Component {
    handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = "/login"
    }
    render() {
        return (
            <nav className="navbar shadow  navbar-expand-lg sticky-top navbar-light bg-light">
                
                <a className="navbar-brand text-warning" href="/index"><img src={brand} alt="Brand" width="120"/></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item different mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="/blogs">Blogs</a>
                        </li>
                        <li className="nav-item different mx-3 font-weight-bold">
                            <a className="nav-link text-warning" href="/qna">QnA</a>
                        </li>
                        <li className="nav-item different mx-3 font-weight-bold">
                                {localStorage.getItem('token') ? 
                                    <a className="nav-link text-warning" href={`/chat?name=${JSON.parse(localStorage.getItem('user')).firstName+JSON.parse(localStorage.getItem('user')).lastName}&room=General`}>Chat Rooms</a>
                                :<></>}
                        </li>                    
                        
                        
                        {localStorage.getItem('token') ? 
                            <>
                                <li className="nav-item different mx-3 font-weight-bold">
                                    <p className="nav-link text-info login mb-0">{JSON.parse(localStorage.getItem('user')).email}</p>  
                                </li>    
                                <li className="nav-item different mx-3 font-weight-bold">
                                    <Link className="nav-link text-info login" style={{textDecoration:"none"}} onClick={this.handleLogout}>Logout</Link> 
                                </li>
                            </>
                            :
                            <li className="nav-item different mx-3 font-weight-bold">
                                <Link className="nav-link text-info login" to="/login">Login</Link> 
                            </li>
                                
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavBarLog;