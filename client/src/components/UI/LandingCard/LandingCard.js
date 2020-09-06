import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles(theme => ({    
      cardContainer: {
        display: "flex",
        margin: "0rem 7rem"
      },
      card: {
          margin:"1rem",
          padding: "1rem"
      },
      cardOuter:{
          borderRadius: "10px",

          margin: "2rem"
      }

}));

const LandingCard = () => {
    const classes = useStyles();  
    const [raised, setRaised] = useState(true);
    const toggleRaised = () => setRaised(!raised);

    return(
        <Card onMouseOver={toggleRaised} onMouseOut={toggleRaised} raised={raised} className={classes.cardOuter}>
            <CardContent className={classes.card}>
            <Typography variant="h4">
            Location
            </Typography>
            <Typography>
            If you want to find sublets in different cities, you need to join different sublet groups. This is inconvenient and can
be a barrier for new customers because they may not be able to find the correct groups.
            </Typography>

            </CardContent>
        </Card>
    );
}

export default LandingCard;