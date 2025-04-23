const express = require('express');
const { TravelEntryData } = require('../Controllers/CitiesController');
const AuthenticateUser = require('../Middleware/Authmiddleware');
const DashboardController = require('../Controllers/DashboardController');

const router = express.Router();

router.post('/cities', AuthenticateUser,TravelEntryData);
router.get('/dashboard', DashboardController)


module.exports = router;