import React from "react";

import ListingCard from "../../../UI/ListingCard/ListingCard";
import classes from "./Content.module.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";

const content = (props) => {
  const listingCards = props.listings.map((listing) => (
    <ListingCard
      title={listing.title}
      bedrooms={listing.bedrooms}
      bathrooms={listing.bathrooms}
      price={listing.price}
    />
  ));
  return <div className={classes.Container}>{listingCards}</div>;
};

export default content;
