import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './NavBar.module.css';

const NavLinkStyle = {
    textDecoration: "none", 
    color: "white", 
    textAlign: "center", 
    padding:"5px", 
    margin: "2px 15px"
}
const NavBar = () => {
    return (
        <div className={classes.navbar}>
            <div>Logo</div>
          <div className={classes.links}>
            <NavLink
              to="/signup"
              style={NavLinkStyle}>
              <div>
                Sign Up
              </div>
            </NavLink>
            <NavLink
              to="/login"
              style={NavLinkStyle}
            >
              <div>
                Login
              </div>
            </NavLink>
          </div>
        </div>
    );
};

export default NavBar;