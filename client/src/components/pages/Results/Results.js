
import React, { useEffect, useState } from "react";
import axios from "axios";

import classes from "./Results.module.css";
import NavBar from "../../UI/NavBar/NavBar";
import FilterSection from "../../UI/ResultsFilters/ResultsFilters";
import Content from "./Content/Content";

const Results = (props) => {
  const [listings, setListings] = useState(null);
  useEffect(() => {
    const info = props.location.state ? props.location.state.info : "";
    const url = "http://localhost:5000/api/listings/address";
    axios.post(url, { address: info.name }).then((res) => {
      console.log(res);
      setListings(res.data.Listings);
    });
  }, [props.location.state]);

  return (
    <>
      <NavBar />
      {/* <div className={classes.ResultsPage}> */}
      {/* <FilterSection /> */}
      <div className={classes.Content}>
        <Content />
        {/* </div> */}
      </div>
    </>
  );
};

export default Results;

