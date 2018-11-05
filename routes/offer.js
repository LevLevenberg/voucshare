const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offer.ctrl');
//get a list of all published offers
router
.route('/offer/get_sent_offers')
.get(offerController.getSentOffers);

//get a list of all published offers
router
.route('/offer/get_recieved_offers')
.get(offerController.getRecievedOffers);

//add new offer to db
router
.route('/offer/add')
.post(offerController.add);

//update existing offer
router
.route('/offer/update/:id')
.post(offerController.update);

//delete offer
router
.route('/offer/delete/:id')
.delete(offerController.delete);

module.exports = router;