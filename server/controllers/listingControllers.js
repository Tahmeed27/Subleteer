const HttpError = require('../models/http-error');
const Listing = require('../models/listing');

const getCoordinatesFromAddress = require('../util/location');

const createListing = async (req, res, next) => {
    const {title, bedrooms, 
        price, gender, address,
        bathrooms, image, creator, description } = req.body;

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
        location: coordinates,
        bathrooms, 
        image, 
        creator, 
        description 
    });

    try{
        await newListing.save();
    }catch(error){
        const err = new HttpError(error, 500);
        return next(err);
    }

    res.status(201).json({newListing});
};

const getListingsByAddress = async (req, res, next) => {

    res.json({message: "successful connection for getting listings by address"});
};

const getListingsByFilters = async (req, res, next) => {

    res.json({message: "Successful connection for getting listings by filters"});
};

const updateListing = async (req, res, next) => {
    
    const {title, bedrooms, price, 
        gender, bathrooms, image, 
        description} = req.body;
    const listingID = req.params.lid;

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

    res.json({message: "Successful connection for deleting listings"});
};

exports.createListing = createListing;
exports.getListingsByAddress = getListingsByAddress;
exports.getListingsByFilters = getListingsByFilters;
exports.updateListing = updateListing;
exports.deleteListing = deleteListing;