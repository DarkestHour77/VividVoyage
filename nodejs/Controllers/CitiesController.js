const CitySchema = require("../Model/CitiesSchema")
const Flights = require('../Model/FlightsSchema')
const moment = require('moment')

async function findFlights(req, res){
    const body = req.body;
    const origin = body.origin;
    const destination = body.destination;
    const departureTime = body.departureTime;

    try{
        const flight = await Flights.find({
            origin,
            destination,
            departureTime: { $lte: moment(departureTime)},
        })
        res.status(200).json(flight)
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports = { findFlights }