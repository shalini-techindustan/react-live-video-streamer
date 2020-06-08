import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu align-center">
            <img src='assets/images/livestream-icon.png' alt='logo' className='headericon' />
            <Link to="/" className="black">
                Home
            </Link>
            <div className="right menu">
                <Link to="/all-streams" className="item">
                    All Streams
                </Link>
                <GoogleAuth />
            </div>
        </div>
    );
};

export default Header;