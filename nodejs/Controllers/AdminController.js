const Flight = require('../Model/FlightsSchema')

async function createFlight(req, res) {
    
    const body = req.body;
    const flightNumber = body.flightNumber;
    const flightName = body.flightName;
    const origin = body.origin;
    const destination = body.destination;
    const departureTime = body.departureTime;
    const arrivalTime = body.arrivalTime;
    const price = body.price;
    const status = body.status;

    const flightObject = {
        flightNumber,
        flightName,
        origin,
        destination,
        departureTime,
        arrivalTime,
        price,
        status
    }

    const newFlight = Flight(flightObject);

    try{
        const response = await newFlight.save();
        res.status(201).json(response)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

async function getAllFlights(req, res){
    try{
        const flights = await Flight.find().sort({departureTime: 1});
        res.json(flights);
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
}

async function getFlightsById(req, res) {

    const params = req.params;
    const id = params.id;
    try{
        const flight = await Flight.findById(id);
        if(!flight) {
            res.status(404).json({message: 'Flight not found'})
        }else{
            res.json(flight);
        }
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

async function deleteFlight(req, res) {

    const params = req.params;
    const id = params.id;
    try{
        const flight = await Flight.deleteOne({_id: id});
        res.status(200).json(flight)  
    }catch(err){
        res.status(400).json(err)
    }
}

async function updateFlight(req, res){
    const params = req.params;
    const id = params.id;
    const body = req.body;
    const flightNumber = body.flightNumber;
    const flightName =body.flightName;
    const origin = body.origin;
    const destination = body.destination;
    const departureTime = body.departureTime;
    const arrivalTime = body.arrivalTime;
    const price = body.price;
    const status = body.status;

    const flightData = {
        flightNumber,
        flightName,
        origin,
        destination,
        departureTime,
        arrivalTime,
        price,
        status
    }

    // const updateFlightData = Flight(flightData);

    try{
        Object.keys(flightData).forEach(key =>
            flightData[key] === undefined && delete flightData[key]
        );

        const updatedFlight = await Flight.findByIdAndUpdate(
            id,
            flightData,
            {new: true, runValidators: true}
        );
        if(!updatedFlight){
            res.status(404).json({message:"Flight not found"})
        }else{
            res.status(200).json(updatedFlight)
        }
    }catch(err){
        res.status(400).json(err)
    }
}

async function searchFlight( req, res){
    try{
        const term = req.query.term;
        const flights = await Flight.find({
            $or:[
                { flightNumber: {$regex: term, $options: 'i'}},
                { flightName: {$regex: term, $options: 'i'}},
                { origin: {$regex: term, $options: 'i'}},
                { destination: {$regex: term, $options: 'i'}},
                { status: {$regex: term, $options: 'i'}}
            ]
        })
        res.status(200).json(flights);
    }catch(err){
        res.status(400).json(err)
    }
}

module.exports = { createFlight, getAllFlights, getFlightsById, deleteFlight, updateFlight, searchFlight }