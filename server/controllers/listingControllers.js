const HttpError = require('../models/http-error');
const Listing = require('../models/listing');


const createListing = async (req, res, next) => {
    const {title, bedrooms, 
        price, gender, address,
        bathrooms, image, creator, description } = req.body;

    const newListing = new Listing({
        title, 
        bedrooms, 
        price, 
        gender, 
        address,  
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
    
    res.json({message: "Successful connection for updating listings"});
};

const deleteListing = async (req, res, next) => {

    res.json({message: "Successful connection for deleting listings"});
};

exports.createListing = createListing;
exports.getListingsByAddress = getListingsByAddress;
exports.getListingsByFilters = getListingsByFilters;
exports.updateListing = updateListing;
exports.deleteListing = deleteListing;