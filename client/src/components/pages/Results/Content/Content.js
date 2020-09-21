import React from "react";
import {useHistory} from 'react-router-dom';
import ListingCard from "../../../UI/ListingCard/ListingCard";
import classes from "./Content.module.css";


const Content = (props) => {

  const history = useHistory();

  const listingCards = props.listings.map((listing) => (
    <ListingCard
      title={listing.title}
      bedrooms={listing.bedrooms}
      bathrooms={listing.bathrooms}
      price={listing.price}
      onClick = {() => {
        console.log()
        history.push('/viewListing', listing);
      }}
      image = {listing.image}
      address = {listing.address}
      seller = {listing.user}
      gender = {listing.gender}
    />
  ));

  return <div className={classes.Container}>{listingCards}</div>;
};

export default Content;
