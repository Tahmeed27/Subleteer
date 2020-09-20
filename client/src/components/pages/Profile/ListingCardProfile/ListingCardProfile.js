import React from 'react';
import classes from './ListingCardProfile.module.css';

const ListingCardProfile = (props) => {
    return (
        <div className={classes.ListingCard} onClick={props.onClick}>
            <div className={classes.Blur}>
                <div>
                    <h2>{props.title}</h2>
                    <h3>${props.price}</h3>
                </div>
                <div className={classes.ButtonDiv}>
                    <button className={classes.EditButton}>Edit</button>
                </div>
            </div>
           
        </div>
    );
};

export default ListingCardProfile;