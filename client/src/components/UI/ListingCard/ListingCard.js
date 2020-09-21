import React from "react";
import classes from "./ListingCard.module.css";
import { faVenusMars} from '@fortawesome/free-solid-svg-icons'
import { faBath} from '@fortawesome/free-solid-svg-icons'
import { faBed} from '@fortawesome/free-solid-svg-icons'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useHistory} from 'react-router-dom';

const ListingCard = (props) => {
  const history = useHistory();
  return (
    <div
      className={classes.ListingCard}
      onClick={() => {
        history.push("/viewListing", { listing: props.listing });
      }}
    >
      <div className={classes.ImgContainer}>
        <img 
          src={`http://localhost:5000/${props.image}`} 
          alt="container" 
        />
      </div>
      <div className={classes.ContentWrapper}>
        <div className={classes.Content}>
          <p>For Sale</p>
          <h1>{props.title}</h1>
          <p>{props.address}</p>
          <div className={classes.Row}>
            <p>$ {props.price}</p>
            <button>Contact Seller</button>
          </div>
        </div>
        <div className={classes.Footer}>
          <div className={classes.FooterLeft}>
            <div className={classes.Feature}>
              <div className={classes.Icon}>
                <FontAwesomeIcon icon={faBed} />
              </div>
              <p>{props.bedrooms}</p>
            </div>
            <div className={classes.Feature}>
              <div className={classes.Icon}>
                <FontAwesomeIcon icon={faBath} />
              </div>
              <p>{props.bathrooms}</p>
            </div>
            <div className={classes.Feature}>
              <div className={classes.Icon}>
                <FontAwesomeIcon icon={faVenusMars} />
              </div>
              <p>{props.gender}</p>
            </div>
          </div>
          <div className={classes.FooterRight}>
            <div className={classes.Icon}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <p>{props.seller.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
