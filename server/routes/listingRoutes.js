const express = require('express');

const listingControllers = require('../controllers/listingControllers');

const router = express.Router();

router.get('/:address', listingControllers.getListingsByAddress);

router.post('/filters', listingControllers.getListingsByFilters);
router.post('/', listingControllers.createListing);

router.patch('/:lid', listingControllers.updateListing);

router.delete('/:lid', listingControllers.deleteListing);


module.exports = router;
