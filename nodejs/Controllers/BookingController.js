const BookingModel = require("../Model/BookingSchema");

async function createBookings(req, res) {
    
    try{
        console.log(req.userId.id)
        const booking = new BookingModel({
            origin: req.body.origin,
            destination: req.body.destination,
            departureTime: req.body.departureTime,
            arrivalTime: req.body.arrivalTime,
            flightName: req.body.flightName,
            flightNumber: req.body.flightNumber,
            price: req.body.price,
            userId: req.userId.id,
        });
        const response = await booking.save();
        res.status(201).json(response)
    }catch(error){
        console.error(error)
        res.status(400).json({error: error.message })
    }
}

async function getBookings(req, res){
    try{
        const Bookings = await BookingModel.find({userId: req.userId.id});
        res.status(200).json(Bookings)
        

    }catch(error){
        res.status(400).json(error)
    }

}

module.exports = { createBookings, getBookings }