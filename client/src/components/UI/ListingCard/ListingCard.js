import React from "react";

import classes from "./ListingCard.module.css";
import Image from "../../../assets/181.jpg";
import { makeStyles } from "@material-ui/core/styles";
import SingleBedIcon from "@material-ui/icons/SingleBed";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BathtubIcon from "@material-ui/icons/Bathtub";

const listingCard = (props) => {
  const useStyles = makeStyles((theme) => ({}));

  return (
    // {/* <Col> */}
    <div className={classes.ListingCard}>
      <div className={classes.ImgContainer}>
        <img src={Image} alt="container" />
      </div>
      <div className={classes.Icons}>
        <SingleBedIcon color="secondary" />
        <AttachMoneyIcon color="secondary" />
        <BathtubIcon color="secondary" />
      </div>
    </div>
    // </Col>
  );
};

export default listingCard;
