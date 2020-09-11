import React from "react";

import ListingCard from "../../../UI/ListingCard/ListingCard";
import classes from "./Content.module.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";

const content = () => {
  return (
    // {/* <Container fluid> */}
    // {/*   <Row lg={3} md={2} sm={1} xs={1}> */}
    <div className={classes.Container}>
      <ListingCard />
      <ListingCard />
      <ListingCard />
      <ListingCard />
      <ListingCard />
      <ListingCard />
      {/* </Row> */}
      {/* </Container> */}
    </div>
  );
};

export default content;
