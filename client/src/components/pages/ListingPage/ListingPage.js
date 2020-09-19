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
            <div className={classes.Col}>
              <p>
                <span>Price</span>: 500
              </p>
              <p>
                <span>Bedrooms</span>: 5
              </p>
            </div>
            <div className={classes.Col}>
              <p>
                <span>Bathrooms</span>: 7
              </p>
              <p>
                <span>Gender</span>: Male
              </p>
            </div>
          </div>
          <div className={classes.Description}>
            "Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum."
          </div>
        </div>
      </div>
    </div>
  );
};

export default listingpage;
