const express = require('express');
const {check} = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const listingControllers = require('../controllers/listingControllers');

const router = express.Router();

router.get('/:uid', listingControllers.getListingsByUserID);

router.post('/address', listingControllers.getListingsByAddress);

router.post(
    '/filters', 
    [
        check('address').notEmpty(),
        check('price').notEmpty().isInt(),
        check('bedrooms').isInt({max: 5, min:1}),
        check('gender').isIn(["male only", "female only", "any"]),
    ], 
    listingControllers.getListingsByFilters);

router.post('/',fileUpload.single('image'), listingControllers.createListing);

router.patch('/', fileUpload.single('image'), listingControllers.updateListing);

router.delete('/', listingControllers.deleteListing);

module.exports = router;
