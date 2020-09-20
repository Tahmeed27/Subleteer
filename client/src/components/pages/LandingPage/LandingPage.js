import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LandingCard from "../../UI/LandingCard/LandingCard";
import Footer from '../../UI/Footer/Footer';
import LandingSearchbar from "../../UI/LandingSearchbar/LandingSearchbar";
import Navbar from '../../UI/NavBar/NavBar';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9f9f9",
  },

  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1524813686514-a57563d77965?ixlib=rb-1.2.1&auto=format&fit=crop&w=2689&q=80')`,
    height: "800px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  titleText: {
    fontSize: "6rem",
  },
  bodyText: {
    fontSize: "2rem",
  },
  centerDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingBottom: "15rem",
  },

  lowerDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px"
  },
  lowerText: {
    padding: "1.5rem",
    fontSize: "3.5rem",
    // fontFamily: "Calibri"
  },
  cardContainer: {
    display: "flex",
    margin: "0rem 7rem",
    marginBottom: "50px",
  },
  card: {
    margin: "1rem",
    padding: "1rem",
  },
  cardOuter: {
    borderRadius: "10px",

    margin: "2rem",
  },
  gridContainer: {
    marginBottom: "2rem"
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <Navbar/>
        <div className={classes.centerDiv}>
          <div className={classes.titleText}>Subleteer</div>
          <div className={classes.bodyText}>Find your ideal sublet</div>
          <LandingSearchbar />
        </div>
      </div>
      <div className={classes.lowerDiv}>
        <Typography variant="h4" className={classes.lowerText}>
          Why Subleteer?
        </Typography>
        <Grid className={classes.gridContainer} container spacing={1} justify="center" >
          <Grid item />
          <Grid item xs={8} md={3} >
            <LandingCard 
              title="Location"
              description="Find sublets in any city with a simple search.
              No need to find different sublet groups anymore."
            />
          </Grid>
          <Grid item xs={8} md={3} >
            <LandingCard 
              title="Filters"
              description="Filter sublets by different factors to get the best matches quickly. Find exactly what you're looking for."
            />
          </Grid>
          <Grid item xs={8} md={3}>
            <LandingCard 
               title = "Ratings"
            description="View building reviews before signing your sublet. No unpleasant surprises when moving in."
            />
          </Grid>
          <Grid item />
        </Grid>
        <Footer/>
      </div>
    </div>
  );
};

export default LandingPage;
