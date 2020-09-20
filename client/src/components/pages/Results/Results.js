import React, { useEffect, } from "react";
// import axios from "axios";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import classes from "./Results.module.css";
import FilterSection from "../../UI/ResultsFilters/ResultsFilters";
import logo from '../../res/Subleteer logo Dark.png';
import Content from "./Content/Content";
import * as actions from "../../../store/actions";

const Results = (props) => {
  const { getListings } = props;
  useEffect(() => {
    const info = props.location.state ? props.location.state.info : "";
    console.log(info)
    const tempAddress = {
      name: "181 Lester Street, Waterloo",
      lat: 43.4713576,
      lng: -80.5347926,
    }
    getListings(tempAddress);
  }, [getListings, props.location]);


  const history = useHistory();

  var imageLocalStorage = localStorage.getItem("userImage");

  return (
    <>
      <div className={classes.NavBar}>
          <div 
            className={classes.Logo} 
            onClick={() => {history.push('/')} }
          >
              <img src={logo} alt="Subleteer logo"/>
          </div>
          {props.isAuthenticated ? <div className={classes.NavBarOptions}>
              <div onClick={() => {history.push('/profile')}} className={classes.NavBarProfileDiv}>
                <Avatar 
                    src={`http://localhost:5000/${imageLocalStorage}`} 
                    alt="profile"
                    style={{ height: '50px', width: '50px', marginRight: "20px"}}
                />            
              </div>
  
              <p className={classes.Logout} onClick={props.logout}>Logout</p>
          </div> : <div/>}
      </div>
      <div className={classes.Container}>
        <FilterSection />
        <div className={classes.Content}>
          <Content listings={props.listings} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listings: state.listings.listings,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListings: (address) => dispatch(actions.getListingsByAddress(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
