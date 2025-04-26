const CitySchema = require("../Model/CitiesSchema")
const Flights = require('../Model/FlightsSchema')
const moment = require('moment')

async function TravelEntryData (req, res) {
    // try {
    //     const city = new CitySchema({
    //         from: req.body.from,
    //         to: req.body.to,
    //         departDate: req.body.departDate,
    //         returnDate: req.body.returnDate,
    //     });
    //     await city.save();
    //     res.status(201).json({message: "City saved"});
    // } catch(error) {
    //     console.error("Error details:", error);
    //     res.status(500).json({error: error.message});    }
}

async function findFlights(req, res){
    const body = req.body;
    const origin = body.origin;
    const destination = body.destination;
    const departureTime = body.departureTime;
    const arrivalTime = body.arrivalTime;

    try{
        // console.log(departureTime)
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

module.exports = { TravelEntryData, findFlights }