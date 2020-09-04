import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import LandingCard from "../LandingCard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9f9f9",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    paddingTop: "1rem",
  },
  links: {
    display: "flex",
    fontSize: "1.5rem",
    margin: "1rem",
  },
  linkText: {
    paddingRight: "1.6rem",
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
    paddingBottom: "2rem",
  },
  search: {
    margin: "2rem",
    backgroundColor: "#fff",
    width: "40rem",
    borderRadius: "40px",
    padding: "0.8rem",
    display: "flex",
  },
  searchIcon: {
    color: "darkGrey",
    marginRight: "0.8rem",
    marginLeft: "1rem",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "black",
    width: "inherit",
    marginLeft: "1rem",
    fontSize: "1.2rem",
  },
  lowerDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  lowerText: {
    padding: "1.5rem",
    fontSize: "3.5rem",
    // fontFamily: "Calibri"
  },
  cardContainer: {
    display: "flex",
    margin: "0rem 7rem",
  },
  card: {
    margin: "1rem",
    padding: "1rem",
  },
  cardOuter: {
    borderRadius: "10px",

    margin: "2rem",
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.hero}>
        <div className={classes.navbar}>
          <div>Logo</div>
          <div className={classes.links}>
            <div className={classes.linkText}>Sign Up</div>
            <div className={classes.linkText}>Login</div>
          </div>
        </div>
        <div className={classes.centerDiv}>
          <div className={classes.titleText}>Subleteer</div>
          <div className={classes.bodyText}>Find your ideal sublet</div>
          <div className={classes.search}>
            <InputBase
              placeholder="Where do you want to live?"
              classes={{
                root: classes.inputRoot,
              }}
              inputProps={{ "aria-label": "search" }}
            />
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.lowerDiv}>
        <Typography variant="h4" className={classes.lowerText}>
          Why Subleteer?
        </Typography>
        <div className={classes.cardContainer}>
          <LandingCard />
          <LandingCard />
          <LandingCard />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

