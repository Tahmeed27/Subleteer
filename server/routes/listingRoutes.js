const express = require('express');
const {check} = require('express-validator');

const listingControllers = require('../controllers/listingControllers');

const router = express.Router();

router.get('/:address', listingControllers.getListingsByAddress);

router.post(
    '/filters', 
    [
        check('address').notEmpty(),
        check('price').notEmpty().isInt(),
        check('bedrooms').isInt({max: 5, min:1}),
        check('gender').isIn(["male only", "female only", "any"]),
    ], 
    listingControllers.getListingsByFilters);

router.post('/', listingControllers.createListing);

router.patch('/:lid', listingControllers.updateListing);

router.delete('/:lid', listingControllers.deleteListing);

module.exports = router;
