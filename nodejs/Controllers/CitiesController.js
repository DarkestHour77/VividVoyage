const CitySchema = require("../Model/CitiesSchema")
const Flights = require('../Model/FlightsSchema')
const moment = require('moment')

async function findFlights(req, res){
    const body = req.body;
    const origin = body.origin;
    const destination = body.destination;
    const departureTime = body.departureTime;
    const arrivalTime = body.arrivalTime;

    try{
        const flight = await Flights.find({
            origin,
            destination,
            departureTime: {$gte: moment(departureTime), $lte: moment(departureTime).add(1, 'days')},
            arrivalTime: {$gte: moment(arrivalTime), $lte: moment(arrivalTime).add(1, 'days')}
        })
        res.status(200).json(flight)
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports = { findFlights }