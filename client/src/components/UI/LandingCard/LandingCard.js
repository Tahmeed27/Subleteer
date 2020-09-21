import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem",
    padding: "1rem",
    //   width:"300px"
  },
  cardOuter: {
    borderRadius: "10px",
    margin: "2rem",
  },
  centerAlign: {
    textAlign: "center",
  },
}));

const LandingCard = (props) => {
  const classes = useStyles();
  const [raised, setRaised] = useState(true);
  const toggleRaised = () => setRaised(!raised);

  return (
    <Card
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={raised}
      className={classes.cardOuter}
    >
      <CardContent className={classes.card}>
        <Typography variant="h4" className={classes.centerAlign}>
          {props.title}
        </Typography>
        <br />
        <Typography className={classes.centerAlign}>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LandingCard;

