const HttpError = require('../models/http-error');
const Listing = require('../models/listing');
const User = require('../models/user');
const getCoordinatesFromAddress = require('../util/location');
const ObjectId = require('mongodb').ObjectID;

const createListing = async (req, res, next) => {
    const {title, bedrooms, 
        price, gender, address,
        bathrooms, image, userID, description } = req.body;

    const lat = address.lat;
    const lng = address.lng;
    const addressName = address.name;

    const newListing = new Listing({
        title, 
        bedrooms, 
        price, 
        gender, 
        address: addressName,  
        location: {
            type: "Point",
            coordinates: [lng, lat]
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

    const lat = address.lat;
    const lng = address.lng;

    const listings = await Listing.find({
        location: {
            $near: {
                $maxDistance: 1000,
                $geometry: {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
        }
    });
    
    res.json({message: "Success! Here are the listings.", listings: listings});
};

const getListingsByFilters = async (req, res, next) => {

    const {address, price, bedrooms, gender} = req.body;

    const lat = address.lat;
    const lng = address.lng;

    const Filters = [
        {
          name: "price", 
          val: price
        },
        {
          name: "bedrooms",
          val: bedrooms
        },
        {
          name: "gender",
          val: gender
        }
      ];

    const query = {
        $and : [
            {
                location: {
                    $near: {
                        $maxDistance: 1000,
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        }
                    }
                }
            }
        ]
    }   

    const filterOptions = {
      "price": {
                    price: {
                        $lte: price
                    }
                },
      "bedrooms": {
                    bedrooms: {
                        $eq: bedrooms
                    }
                },
      "gender": {
                    gender: {
                        $eq: gender
                    }
                }
    }

    Filters.forEach(filter => {
          if(filter.val !== null ){
              query.$and.push(filterOptions[filter.name]);
          }
      });

    let listings = [];
    try{
        listings = await Listing.find(query);
    }catch(error){
        const err = new HttpError("Couldn't find any listings", 500);
        return next(err);
    }

    res.json({listings});
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