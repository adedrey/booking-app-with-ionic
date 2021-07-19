const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offers');

router.get('/api/discover/offer/:id', offerController.getOfferById);
router.post('/api/discover/offer/:id/edit', offerController.postUpdateOffer);
router.post('/api/discover/offer/new-offer', offerController.postOffer);
router.get('/api/discover/offers', offerController.getOffers);
router.delete('/api/discover/offer/:id', offerController.deleteOffer);

module.exports = router