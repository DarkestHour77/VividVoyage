const express = require('express');
const {createBookings, getBookings} = require("../Controllers/BookingController");
const DashboardController = require('../Controllers/DashboardController');
const AuthenticateUser = require('../Middleware/Authmiddleware');

const router = express.Router();

router.post('/booking', AuthenticateUser, createBookings)
router.get("/booking", AuthenticateUser, getBookings)
router.get('/dashboard', AuthenticateUser, DashboardController)


module.exports = router;