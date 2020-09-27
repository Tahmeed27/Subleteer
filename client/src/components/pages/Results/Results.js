import React, { useEffect, useState} from "react";
// import axios from "axios";
import { connect } from "react-redux";
import {useHistory} from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import classes from "./Results.module.css";
import FilterSection from "../../UI/ResultsFilters/ResultsFilters";
import logo from '../../res/Subleteer logo Dark.png';
import Content from "./Content/Content";
import { faFrownOpen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as actions from "../../../store/actions";
import Footer from '../../UI/Footer/Footer';

const Results = (props) => {
  const { getListings } = props;
  
  const [searchAddress, setSearchAddress] = useState(); //This is the address that the user currently wants the results for

  useEffect(() => {
    const info = props.location.state ? props.location.state.info : "";
    
    const tempAddress = {
      name: "181 Lester Street, Waterloo",
      lat: 43.4713576,
      lng: -80.5347926,
    }
    if(info === ""){
      getListings(tempAddress);
      setSearchAddress(tempAddress);
    }else{
      getListings(info);
      setSearchAddress(info);
    }
    
  }, [getListings, props.location]);

  const noListingsFound = (
    <div className={classes.NoListings}>
      <FontAwesomeIcon icon={faFrownOpen} size="10x" className={classes.Icon}/>
      <h1>Uh Oh!</h1>
      <h2>Looks like no one is subletting with these requirements yet. Check again later.</h2>
    </div>
  );

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
        <FilterSection address ={searchAddress}/>
        <div className={classes.Content}>
          <h1 className={classes.ResultsHeader}>Results:</h1>
          { props.listings.length !== 0 ?  
            <Content listings={props.listings} /> : 
            noListingsFound
          }
        </div>
      </div>
      <Footer/>
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
