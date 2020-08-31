import React from "react";
import {Link} from 'react-router-dom'

import brand from '../assets/brand.png'

class Footer extends React.Component {
    handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token')
    }
    render() {
        return (
            <nav className="navbar sticky-bottom navbar-light bg-dark">
                <a className="text-warning w-100 text-center small" href="index">Copyright &copy; MentoMeet 2020</a>                
            </nav>
        )
    }
}

export default Footer;