import React from "react";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import classes from "./ListingPage.module.css";
import Carousel from "../../UI/Carousel/Carousel";
import Footer from '../../UI/Footer/Footer';
import logo from '../../res/Subleteer logo Dark.png';
import { Avatar } from '@material-ui/core';
import * as actions from '../../../store/actions/index';

const ListingPage = (props) => {

  const history = useHistory();

  const imageLocalStorage = localStorage.getItem("userImage");

  const listing = props.location.state;

  return (
    <div className={classes.ListingPage}>
      <div className={classes.NavBar}>
          <div className={classes.Logo} onClick={() => {history.push('/')}}>
              <img src={logo} alt="Subleteer logo"/>
          </div>
          <div className={classes.NavBarOptions}>
              { props.isAuthenticated ? 
              <>
                <div onClick={() => {history.push('/profile')}} className={classes.NavBarProfileDiv}>
                  <Avatar 
                      src={`/${imageLocalStorage}`} 
                      alt="profile"
                      style={{ height: '50px', width: '50px', marginRight: "20px"}}
                  />            
                </div>
                <p className={classes.Logout} onClick={props.logout}>Logout</p> 
              </>
              : null}
          </div>
      </div>

      <div className={classes.Content}>
        <div className={classes.Carousel}>
          <Carousel image={listing.image} title={props.title}/>
        </div>
        <div className={classes.ListingInfo}>
          <h2>{listing.title}</h2>
          <h5>
            By <em>{listing.user.username}</em>
          </h5>
          <div className={classes.List}>
            <div className={classes.Col}>
              <p>
                <span>Price</span>: {listing.price}
              </p>
              <p>
                <span>Bedrooms</span>: {listing.bedrooms}
              </p>
            </div>
            <div className={classes.Col}>
              <p>
                <span>Bathrooms</span>: {listing.bedrooms}
              </p>
              <p>
                <span>Gender</span>: {listing.gender}
              </p>
            </div>
          </div>
          <div className={classes.Description}>{listing.description}</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.auth.username,
    email: state.auth.email,
    userID: state.auth.userId,
    userImage: state.auth.imageURL,
    userListings: state.listings.listingsByUserID,
    isAuthenticated: state.auth.token !== null, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      logout: () => dispatch(actions.logout()),
      getListingsByUserID: (userID) => dispatch(actions.getListingsByUserID(userID))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ListingPage);