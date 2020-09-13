import React from "react";
import classes from "./ListingPage.module.css";
import NavBar from "../../UI/NavBar/NavBar";
import Carousel from "../../UI/Carousel/Carousel";

const listingpage = (props) => {
  return (
    <div className={classes.ListingPage}>
      <NavBar />
      <div className={classes.Content}>
        <div className={classes.Carousel}>
          <Carousel />
        </div>
        <div className={classes.ListingInfo}>
          <h2>250 Lester Street</h2>
          <h5>
            By <em>obaranek</em>
          </h5>
          <div className={classes.List}>
            <div>Price: $500</div>
            <div>Bedrooms: 5</div>
            <div>Bathrooms: 4</div>
            <div>Gender: Co-ed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default listingpage;
