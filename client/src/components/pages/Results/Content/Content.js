import React from "react";
import {useHistory} from 'react-router-dom';
import ListingCard from "../../../UI/ListingCard/ListingCard";
import classes from "./Content.module.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";

const Content = (props) => {

  const history = useHistory();

  const listingCards = props.listings.map((listing) => (
    <ListingCard
      title={listing.title}
      bedrooms={listing.bedrooms}
      bathrooms={listing.bathrooms}
      price={listing.price}
      onClick = {() => {
        history.push('/viewListing', listing);
      }}
    />
  ));
  return <div className={classes.Container}>{listingCards}</div>;
};

export default Content;
