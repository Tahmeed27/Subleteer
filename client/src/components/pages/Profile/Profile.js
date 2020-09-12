import React from 'react';
import classes from './Profile.module.css';
import NavBar from '../../UI/NavBar/NavBar';

const Profile = () => {
    return (
        <div className={classes.Profile}>
            <NavBar/>
        </div>
    );
};

export default Profile;