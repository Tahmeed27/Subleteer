//const HttpError = require('../models/http-error');

const createListing = async (req, res, next) => {

    res.json({message: "successful connection for creating a new listing"});
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