const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rental');

router.post('/create', rentalController.createRental);

module.exports = router;
