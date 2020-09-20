import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Profile.module.css';
import {connect} from 'react-redux';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../../store/actions/index';
import ListingCardProfile from './ListingCardProfile/ListingCardProfile';
import Footer from '../../UI/Footer/Footer';
import logo from '../../res/Subleteer logo Dark.png';



const Profile = (props) => {

    const history = useHistory();

    const {userListings} = props;
    const {userID}= props;
    const {getListingsByUserID} = props;
    
    useEffect(() => {
        getListingsByUserID(userID)
    }, [userID, getListingsByUserID])

    var listings;
    try{
        listings = (
            <div className={classes.Listings}>
                {userListings.map(listing => {
                   return (
                    <ListingCardProfile 
                        title={listing.title}
                        price={listing.price}
                    
                        onClick={() => {
                            history.push("/updateListing", {listing})
                        }}
                    />
                    )
                })}
            </div>
        );
    }catch(error){
        console.log(error);
    }

    const imageLocalStorage = localStorage.getItem("userImage");

    return (
        <>
            <div className={classes.NavBar}>
                <div className={classes.Logo} onClick={() => {history.push('/')}}>
                    <img src={logo} alt="Subleteer logo"/>
                </div>
                <div className={classes.NavBarOptions}>
                    <Avatar 
                        src={`http://localhost:5000/${imageLocalStorage}`} 
                        alt="profile"
                        style={{ height: '50px', width: '50px', marginRight: "20px"}}
                    />
                    <p className={classes.Logout} onClick={props.logout}>Logout</p>
                </div>
            </div>

            <div className={classes.Profile}>
                <main className={classes.Main}>
                    <div className={classes.UserInfo}>
                        <div className={classes.DPWrapper}>
                            <Avatar 
                                src={`http://localhost:5000/${imageLocalStorage}`} 
                                alt="profile"
                                style={{ height: '200px', width: '200px' }}
                            />
                            {/* <div className={classes.ProfilePicture}>
                                <img src={`http://localhost:5000/${props.userImage}`} alt="profile"/>
                            </div> */}
                            <p className={classes.Greetings}>Hi, <span style={{fontWeight:"bold"}}>{props.username}</span></p>
                        </div>
                       
                        <div className={classes.Acount}>
                            <h2>Acount</h2>
                            <p><b>Email: </b>{props.email}</p>
                            <p><b>Number of listings: {userListings.length}</b></p>
                        </div>
                        <div className={classes.NewListing}>
                            <h2>Create New Listing</h2>
                            <p>Looking to sublet your aparment? Add a listing today and get access to a community of tenants looking for a place.</p>
                            <button onClick={() => {history.push('/addlisting')}}>Create New Listing</button>
                        </div>
                    </div>    
                    <div className={classes.Content}>
                        <h1>My Listings</h1>
                        {listings}
                    </div>   
                </main>
            </div>
            <Footer/>
        </>
        
    );
};

const mapStateToProps = (state) => {
    return {
      username: state.auth.username,
      email: state.auth.email,
      userID: state.auth.userId,
      userImage: state.auth.imageURL,
      userListings: state.listings.listingsByUserID,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout()),
        getListingsByUserID: (userID) => dispatch(actions.getListingsByUserID(userID))
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(Profile);