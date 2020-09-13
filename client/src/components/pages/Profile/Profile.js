import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Profile.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

const Profile = (props) => {

    const history = useHistory();

    const {userListings} = props;
    const {userID}= props;
    const {getListingsByUserID} = props;
    
    useEffect(() => {
        getListingsByUserID(userID)
    }, [userID, getListingsByUserID])

    console.log(userListings, userID);

    return (
        <>
            <div className={classes.NavBar}>
                <div>
                    Logo
                </div>
                <div className={classes.NavBarOptions}>
                    <div className={classes.ProfilePicture}>
                        <img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t31.0-8/12094921_147224075630721_5972001613300631429_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=hO5LgG-2_kQAX_XcNfU&_nc_ht=scontent-yyz1-1.xx&oh=8d2b5b051795d5664e6f2c08b49b4cc7&oe=5F8297AC" alt="profile"/>
                    </div>
                    <p className={classes.Logout} onClick={props.logout}>Logout</p>
                </div>
            </div>

            <div className={classes.Profile}>
                <main className={classes.Main}>
                    <div className={classes.UserInfo}>
                        <div className={classes.DPWrapper}>
                            <div className={classes.ProfilePicture}>
                                <img src="https://scontent-yyz1-1.xx.fbcdn.net/v/t31.0-8/12094921_147224075630721_5972001613300631429_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=hO5LgG-2_kQAX_XcNfU&_nc_ht=scontent-yyz1-1.xx&oh=8d2b5b051795d5664e6f2c08b49b4cc7&oe=5F8297AC" alt="profile"/>
                            </div>
                            <p className={classes.Greetings}>Hi, <span style={{fontWeight:"bold"}}>{props.username}</span></p>
                        </div>
                       
                        <div className={classes.Acount}>
                            <h2>Acount</h2>
                            <p><b>Email: </b>{props.email}</p>
                            <p><b>Number of listings: {userListings.length}</b></p>
                            <br/>
                        </div>
                        <div className={classes.NewListing}>
                            <h2>Create New Listing</h2>
                            <p>Looking to sublet your aparment? Add a listing today and get access to a community of tenants looking for a place.</p>
                            <button onClick={() => {history.push('/addlisting')}}>Create New Listing</button>
                        </div>
                    </div>    
                    <div className={classes.Content}>
                        <h1>Here are all your listings</h1>
                        
                    </div>   
                </main>
            </div>
        </>
        
    );
};

const mapStateToProps = (state) => {
    return {
      username: state.auth.username,
      email: state.auth.email,
      userID: state.auth.userId,
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