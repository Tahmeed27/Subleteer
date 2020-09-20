import React, { useState } from 'react'
import classes from './UpdateListings.module.css'
import FormSearchbar from '../../UI/FormSearchbar/FormSearchbar'
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios'
import ImagePicker from '../../UI/ImagePicker/ImagePicker';

import { Typography, TextField, Grid, Paper, MenuItem, Button } from '@material-ui/core';



const UpdateListings = (props) => {
    const handleSubmit = () => {
        console.log("Sending this to server: ", eachEntry)
        const url = 'http://localhost:5000/api/listings'

        const formData = new FormData();

        formData.append('title', eachEntry.title);
        formData.append('price', eachEntry.price);
        formData.append('addressName', eachEntry.address.name);
        formData.append('addressLat', eachEntry.address.lat);
        formData.append('addressLng', eachEntry.address.lng);
        formData.append('gender', eachEntry.gender);
        formData.append('bedrooms', eachEntry.bedrooms);
        formData.append('bathrooms', eachEntry.bathrooms);
        formData.append('image', eachEntry.image);
        formData.append('description', eachEntry.description);
        formData.append('listingID', listing._id);
        formData.append('userID', props.userID);

        axios({
            method: "PATCH",
            url: url,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
          })
          .then((response) => {
              history.push('/profile')
            //console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    }

    const listing = props.location.state ? props.location.state.listing : "";

    const initialInputState = { 
        title: listing.title, 
        address: listing.address,
        price: listing.price,
        gender: listing.gender,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        image: listing.image,
        description: listing.description,
        userID: props.userID,
    };

    const history = useHistory()
    const [eachEntry, setEachEntry] = useState(initialInputState);
    const {title, address, price, gender, bedrooms, bathrooms, image, description} = eachEntry;
    
    const handleInputChange = e => setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })

    const imageAdded = (image) => {
        setEachEntry({...eachEntry, image: image});
    }

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        const info = {name: value, ...latLng}
        setEachEntry({ ...eachEntry, address: info})
      };

    if (!eachEntry.userID && props.userID) {
        setEachEntry({...eachEntry, userID: props.userID})
    }
    
    return (
        <div className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <Grid item xs />
                <Grid item xs={10} md={6}>
                    <Paper className={classes.formContainer}>
                        <Typography className={classes.titleText} variant="h3" align="center">Update your Listing</Typography>
                        <TextField
                            name="title"
                            label="Title"
                            fullWidth
                            value={title}
                            variant="outlined"
                            onChange={handleInputChange}
                            style={{marginBottom:"1rem"}}
                        />
                        <FormSearchbar placeholder={address} handleSelect={handleSelect} />
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

                        <ImagePicker id="image"  preview={image} onInput={imageAdded}/>
                        
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button onClick={handleSubmit} size="large" variant="contained" style={{color:"#f9f9f9", backgroundColor: "#FFA500"}}>
                            Update
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
  
  
export default connect(mapStateToProps)(UpdateListings);

