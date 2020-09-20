const express = require('express');
const {check} = require('express-validator');
const fileUpload = require('../middleware/file-upload');
const listingControllers = require('../controllers/listingControllers');

const router = express.Router();

router.get('/:uid', listingControllers.getListingsByUserID);

router.post('/address', listingControllers.getListingsByAddress);

router.post('/filters', listingControllers.getListingsByFilters);

router.post('/',fileUpload.single('image'), listingControllers.createListing);

router.patch('/', fileUpload.single('image'), listingControllers.updateListing);

router.delete('/', listingControllers.deleteListing);

module.exports = router;
