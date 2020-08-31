const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {type: String, required: true}, //Name of sublet listing
    bedrooms: {type: Number, required: true}, //Number of bedrooms available
    price: {type: Number, required: true}, //Monthly rent 
    gender: {type: String, required: true}, // "Female only" || "Male only" || "any"
    address: {type: String, required: true}, // String address to display in listing
    /*location: { 
        lat: {type: Number, required: true}, //Latitude for listing recommendations
        lng: {type: Number, required: true} // Longitude for listing recommendations
    },*/
    bathrooms: {type: String, required: true}, // Number of bathrooms available
    image: {type: String, required: true}, // ImageURL of the sublet (1 image for now)
    creator: {type: String, required: true}, // User who created it (will change to user Model later)
    description: {type: String, required: true} //Other descriptions like facilities etc.
});


module.exports = mongoose.model('Listing', listingSchema);