const express = require('express');
const {createBookings, getBookings} = require("../Controllers/BookingController");
const DashboardController = require('../Controllers/DashboardController');

const router = express.Router();

router.post('/booking', createBookings)
router.get("/booking", getBookings)
router.get('/dashboard', DashboardController)


module.exports = router;