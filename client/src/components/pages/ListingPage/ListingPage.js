import React from "react";
import classes from "./ListingPage.module.css";
import NavBar from "../../UI/NavBar/NavBar";
import Carousel from "../../UI/Carousel/Carousel";

const Listingpage = (props) => {
  console.log(props.location.state.listing);
  const listing = props.location.state.listing;
  return (
    <div className={classes.ListingPage}>
      <NavBar />
      <div className={classes.Content}>
        <div className={classes.Carousel}>
          <Carousel />
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
    </div>
  );
};

export default Listingpage;
