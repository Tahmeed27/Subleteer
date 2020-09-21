const HttpError = require('../models/http-error');
const Listing = require('../models/listing');
const User = require('../models/user');
const getCoordinatesFromAddress = require('../util/location');
const ObjectId = require('mongodb').ObjectID;


const getListingsByUserID = async (req,res,next) => {
    const userID = req.params.uid;

    let listings;
    try{  
        listings = await Listing.find({
            userID: ObjectId(userID)
        });   
    }catch(error){
        console.log(error);
        const err = new HttpError("Couldn't get listings by user, please try again later", 500);
        return next(err);
    }
    
    res.status(201).json({listings, message: "Success! Here are the listings."});
};

const createListing = async (req, res, next) => {
    const {title, bedrooms, 
        price, gender, addressName, addressLng, addressLat,
        bathrooms, userID, description } = req.body;

    // console.log(addressLng, addressLat, addressName, title, bedrooms, price, gender, bathrooms, userID, description);

    const image = req.file.path;
    // console.log(image);

    const lng = Number(addressLng);
    const lat = Number(addressLat);

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

    let editedListings = [];

    try{
        /*
        editedListings = await Promise.all(listings.map(async (listing) => {
            const userID = listing.userID;
            const MongoUser = await User.find(ObjectId(userID));
            listing = {...listing, location: listing.location, user: MongoUser[0]};
        }));*/
        
        for(var listing of listings){
            const userID = listing.userID;
            const mongoUser = await User.find(ObjectId(userID));
            listing = {
                user: mongoUser[0],
                title: listing.title,
                bedrooms: listing.bedrooms,
                price: listing.price,
                gender: listing.gender,
                address: listing.address,
                location: listing.location, 
                bathrooms: listing.bathrooms,
                image: listing.image,
                description: listing.description
            };
            editedListings.push(listing);
        }
    }catch(error){
        console.log(error);
        const err = new HttpError("Something went wrong when trying to find user data for each listing", 500);
        return next(err);
    }
    
    res.json({message: "Success! Here are the listings.", listings: editedListings});
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
                        $lte: bedrooms
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

    let editedListings = [];

    try{
        /*
        editedListings = await Promise.all(listings.map(async (listing) => {
            const userID = listing.userID;
            const MongoUser = await User.find(ObjectId(userID));
            listing = {...listing, location: listing.location, user: MongoUser[0]};
        }));*/
        
        for(var listing of listings){
            const userID = listing.userID;
            const mongoUser = await User.find(ObjectId(userID));
            listing = {
                user: mongoUser[0],
                title: listing.title,
                bedrooms: listing.bedrooms,
                price: listing.price,
                gender: listing.gender,
                address: listing.address,
                location: listing.location, 
                bathrooms: listing.bathrooms,
                image: listing.image,
                description: listing.description
            };
            editedListings.push(listing);
        }
    }catch(error){
        console.log(error);
        const err = new HttpError("Something went wrong when trying to find user data for each listing", 500);
        return next(err);
    }

    res.json({message: "Sucsess! Here are the listings.", listings: editedListings});
};

const updateListing = async (req, res, next) => {
    
    const {title, bedrooms, price, 
        gender, bathrooms, description, listingID} = req.body;

    const image = req.file.path;

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

exports.getListingsByUserID = getListingsByUserID;
exports.createListing = createListing;
exports.getListingsByAddress = getListingsByAddress;
exports.getListingsByFilters = getListingsByFilters;
exports.updateListing = updateListing;
exports.deleteListing = deleteListing;