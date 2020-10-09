import React from 'react';
import classes from './ListingCardProfile.module.css';

const ListingCardProfile = (props) => {
    return (
        <div className={classes.ListingCard} >
           <div className={classes.ImageDiv}>
               <img src={`/${props.listing.image}`}/>
           </div>
           <div className={classes.Content}>
                <h2>{props.listing.title}</h2>
            </div>
            <div className={classes.ButtonDiv}>
                <h3>${props.listing.price}</h3>
                <button 
                    className={classes.EditButton}
                    onClick={props.onClick}
                >Edit</button>
            </div>
        </div>
    );
};

export default ListingCardProfile;