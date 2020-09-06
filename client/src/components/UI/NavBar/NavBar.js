import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import classes from "./NavBar.module.css";

const NavLinkStyle = {
  textDecoration: "none",
  color: "white",
  textAlign: "center",
  padding: "5px",
  margin: "2px 15px",
};

const NavBar = (props) => {
  let nav = (
    <React.Fragment>
      <NavLink to="/signup" style={NavLinkStyle}>
        <div>Sign Up</div>
      </NavLink>
      <NavLink to="/login" style={NavLinkStyle}>
        <div>Log In</div>
      </NavLink>
    </React.Fragment>
  );

  if (props.isAuthenticated) {
    nav = <div style={NavLinkStyle}>Hello, {props.username}</div>;
  }

  return (
    <div className={classes.navbar}>
      <div>Logo</div>
      <div className={classes.links}>{nav}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, null)(NavBar);

