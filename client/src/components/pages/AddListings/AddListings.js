import React, { useState } from 'react'
import classes from './AddListings.module.css'
import FormSearchbar from '../../UI/FormSearchbar/FormSearchbar'
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios'

import { Typography, TextField, Grid, Paper, MenuItem, Button } from '@material-ui/core';



const AddListing = ({userID}) => {
    const handleSubmit = () => {
        console.log("Sending this to server: ", eachEntry)
        const url = 'http://localhost:5000/api/listings'

        axios.post(url, eachEntry)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })
        history.push('/results')
    }

    const initialInputState = { 
        title: "", 
        address: "",
        price: "",
        gender: "",
        bedrooms: "",
        bathrooms: "",
        // image: ?
        description: "",
        userID: userID,
    };
    const history = useHistory()
    const [eachEntry, setEachEntry] = useState(initialInputState);
    const {title, price, gender, bedrooms, bathrooms, description} = eachEntry;
    
    const handleInputChange = e => setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        const info = {name: value, ...latLng}
        setEachEntry({ ...eachEntry, address: info})
      };
    if (!eachEntry.userID && userID) {
        setEachEntry({...eachEntry, userID: userID})
    }
    
    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs />
                <Grid item xs={10} md={6}>
                    <Paper className={classes.formContainer}>
                        <Typography className={classes.titleText} variant="h3" align="center">Create a Listing</Typography>
                        <TextField
                            name="title"
                            label="Title"
                            fullWidth
                            value={title}
                            variant="outlined"
                            onChange={handleInputChange}
                            style={{marginBottom:"1rem"}}
                        />
                        <FormSearchbar handleSelect={handleSelect} />
                        <TextField
                            name="description"
                            label="Description"
                            fullWidth
                            multiline
                            rows={3}
                            value={description}
                            variant="outlined"
                            onChange={handleInputChange}
                            style={{marginBottom:"1rem"}}
                        />
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <TextField
                                type="number"
                                name="bedrooms"
                                label="Number of Bedrooms"
                                value={bedrooms}
                                style={{marginBottom:"1rem", marginRight:"1rem"}}
                                variant="outlined"
                                onChange={handleInputChange}
                            />

                            <TextField
                                type="number"
                                name="bathrooms"
                                label="Number of Bathrooms"
                                style={{marginBottom:"1rem"}}
                                value={bathrooms}
                                variant="outlined"
                                onChange={handleInputChange}
                            />

                        </div>

                        <div style={{display:"flex", justifyContent:"space-between"}}>

                            <TextField
                                type="number"
                                name="price"
                                label="Monthly Rent"
                                value={price}
                                variant="outlined"
                                onChange={handleInputChange}
                                style={{marginBottom:"1rem", marginRight:"1rem"}}

                            />
                            <TextField
                                name="gender"
                                id="Gender Preferences"
                                label="Gender"
                                helperText="Please select any gender preferences"
                                value={gender}
                                select
                                variant="outlined"
                                style={{marginBottom:"1rem"}}
                                onChange={handleInputChange}
                                >
                                 <MenuItem value="male">Male Only</MenuItem>  
                                 <MenuItem value="female">Female Only</MenuItem>  
                                 <MenuItem value="any">Co-ed</MenuItem>  
                            </TextField>
                        </div>
                        {/* <input
                            accept="image/*"
                            style={{display: "none"}}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                            Upload
                            </Button>
                        </label> */}
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button onClick={handleSubmit} size="large" variant="contained" style={{color:"#f9f9f9", backgroundColor: "#FFA500"}}>
                            Submit
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs />
            </Grid>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userID: state.auth.userId,
    };
  };
  
  
export default connect(mapStateToProps)(AddListing);

