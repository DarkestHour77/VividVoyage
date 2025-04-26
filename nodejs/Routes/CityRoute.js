const express = require('express');
const { TravelEntryData, findFlights } = require('../Controllers/CitiesController');
const AuthenticateUser = require('../Middleware/Authmiddleware');
const DashboardController = require('../Controllers/DashboardController');

const router = express.Router();

router.post('/cities',findFlights);
router.get('/dashboard', DashboardController)


module.exports = router;