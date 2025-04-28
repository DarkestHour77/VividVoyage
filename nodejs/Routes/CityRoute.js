const express = require('express');
const { findFlights } = require('../Controllers/CitiesController');
const AuthenticateUser = require('../Middleware/Authmiddleware');

const router = express.Router();

router.post('/cities', AuthenticateUser, findFlights);

module.exports = router;