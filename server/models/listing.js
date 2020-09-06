const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const listingSchema = new Schema({
    title: {type: String, required: true}, //Name of sublet listing
    bedrooms: {type: Number, required: true}, //Number of bedrooms available
    price: {type: Number, required: true}, //Monthly rent 
    gender: {type: String, required: true}, // "Female only" || "Male only" || "any"
    address: {type: String, required: true}, // String address to display in listing
    location: {
        type: { type: String },
        coordinates: []
    },
    bathrooms: {type: Number, required: true}, // Number of bathrooms available
    image: {type: String, required: true}, // ImageURL of the sublet (1 image for now)
    userID: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}, // User who created it
    description: {type: String, required: true} //Other descriptions like facilities etc.
});

listingSchema.index({location: "2dsphere"});

module.exports = mongoose.model('Listing', listingSchema);