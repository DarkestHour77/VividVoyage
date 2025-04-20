const express = require('express');
const { TravelEntryData } = require('../Controllers/CitiesController')

const router = express.Router();

router.post('/cities',TravelEntryData);


module.exports = router;