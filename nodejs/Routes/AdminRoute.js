const express = require('express');
const { createFlight, getAllFlights, getFlightsById, deleteFlight, updateFlight, searchFlight } = require('../Controllers/AdminController')
const router = express.Router();

router.post('/adminpanel', createFlight)
router.get('/adminpanel', getAllFlights)
router.get('/adminpanel/:id', getFlightsById)
router.delete('/adminpanel/:id', deleteFlight )
router.put('/adminpanel/:id', updateFlight)
router.get('/adminpanel/search', searchFlight)

module.exports = router;