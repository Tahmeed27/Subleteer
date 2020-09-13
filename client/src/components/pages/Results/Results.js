import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import classes from "./Results.module.css";
import NavBar from "../../UI/NavBar/NavBar";
import FilterSection from "../../UI/ResultsFilters/ResultsFilters";
import Content from "./Content/Content";
import * as actions from "../../../store/actions";

const Results = (props) => {
  const { getListings } = props;
  useEffect(() => {
    console.log(props.location);
    const info = props.location.state ? props.location.state.info : "";
    getListings(info);
  }, [getListings, props.location]);

  console.log(props.listings);

  return (
    <>
      <NavBar />
      <div className={classes.Container}>
        <FilterSection />
        <div className={classes.Content}>
          <Content listings={props.listings} />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    listings: state.listings.listings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListings: (address) => dispatch(actions.getListingsByAddress(address)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
