import React from 'react';
import { NavLink } from "react-router-dom";
import classes from './NavBar.module.css';

const NavLinkStyle = {
    textDecoration: "none", 
    color: "white", 
    textAlign: "center", 
    border: "1px solid white", 
    padding:"5px", 
    margin: "2px 10px"
}
const NavBar = () => {
    return (
        <div className={classes.navbar}>
            <div>Logo</div>
          <div className={classes.links}>
            <NavLink
              to="/signup"
              style={NavLinkStyle}
            >
              <div
                className={classes.linkText}
                activeClassName={classes.linkText}
              >
                Sign Up
              </div>
            </NavLink>
            <NavLink
              to="/login"
              style={NavLinkStyle}
            >
              <div
                className={classes.linkText}
                activeClassName={classes.linkText}
              >
                LogIn
              </div>
            </NavLink>
          </div>
        </div>
    );
};

export default NavBar;