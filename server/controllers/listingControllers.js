const HttpError = require('../models/http-error');
const Listing = require('../models/listing');
const User = require('../models/user');
const getCoordinatesFromAddress = require('../util/location');
const ObjectId = require('mongodb').ObjectID;

const createListing = async (req, res, next) => {
    const {title, bedrooms, 
        price, gender, address,
        bathrooms, image, userID, description } = req.body;

    let coordinates;
    try{
        coordinates = await getCoordinatesFromAddress(address);
    }catch(error){
        console.log(error);
        return next(error);
    }

    const newListing = new Listing({
        title, 
        bedrooms, 
        price, 
        gender, 
        address,  
        location: {
            type: "Point",
            coordinates: [coordinates.lng, coordinates.lat]
        },
        bathrooms, 
        image, 
        userID : ObjectId(userID), 
        description 
    });

    let user;

    try{
        user = await User.find(ObjectId(userID));
    }catch(error){
        console.log(error);
        const err = new HttpError("Couldn't create listing, please try again later", 500);
        return next(err);
    }

    if(!user){
        const err = new HttpError("User doesn't exist, couldn't create listing", 404);
        return next(err);
    }

    try{
        await newListing.save();
    }catch(error){
        const err = new HttpError(error, 500);
        return next(err);
    }

    res.status(201).json({newListing, message: "Success! Listing created."});
};

const getListingsByAddress = async (req, res, next) => {
    const {address} = req.body;

    let coordinates;
    try{
        coordinates = await getCoordinatesFromAddress(address);
    }catch(error){
        console.log(error);
        return next(error);
    }

    const listings = await Listing.find({
        location: {
            $near: {
                $maxDistance: 1000,
                $geometry: {
                    type: "Point",
                    coordinates: [coordinates.lng, coordinates.lat]
                }
            }
        }
    });
    
    res.json({message: "successful connection for getting listings by address", listings: listings});
};

const getListingsByFilters = async (req, res, next) => {

    res.json({message: "Successful connection for getting listings by filters"});
};

const updateListing = async (req, res, next) => {
    
    const {title, bedrooms, price, 
        gender, bathrooms, image, 
        description, listingID} = req.body;

    let listing;

    try{
        listing = await Listing.findById(listingID);
    }
    catch(error){
        const err = new HttpError("Something went wrong, couldn't update listing", 500);
        return next(err);
    }

    if(title !== null){
        listing.title = title;
    }
    if(bedrooms !== null){
        listing.bedrooms = bedrooms;
    }
    if(price !== null){
        listing.price = price;
    }
    if(gender !== null){
        listing.gender = gender;
    }
    if(bathrooms !== null){
        listing.bathrooms = bathrooms;
    }
    if(image !== null){
        listing.image = image;
    }
    if(description !== null){
        listing.description = description;
    }
    

    try{
        await listing.save();
    }catch(error){
        const err = new HttpError(error, 500);
        return next(err);
    }

    res.status(201).json({listing: listing.toObject({getters: true})});
};

const deleteListing = async (req, res, next) => {

    const {listingID} = req.body;

    let listing; 
    try{
        listing = await Listing.findById(listingID);
    }
    catch(error){
        const err = new HttpError("Something went wrong, couldn't delete listing", 500);
        return next(err);
    }

    try{
        await listing.remove();
    }catch(error){
        const err = new HttpError("Something went wrong, couldn't delete listing", 500);
        return next(err);
    }

    res.json({message: "Deleted listing"});
};

exports.createListing = createListing;
exports.getListingsByAddress = getListingsByAddress;
exports.getListingsByFilters = getListingsByFilters;
exports.updateListing = updateListing;
exports.deleteListing = deleteListing;