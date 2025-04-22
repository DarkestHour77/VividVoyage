const express = require('express');
const { TravelEntryData } = require('../Controllers/CitiesController');
const AuthenticateUser = require('../Middleware/Authmiddleware');

const router = express.Router();

router.post('/cities', AuthenticateUser,TravelEntryData);


module.exports = router;