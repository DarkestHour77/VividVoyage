const { Schema, default: mongoose} = require("mongoose");

const FlightSchema = new Schema({
    flightNumber: {type: String, required: true, unique: true},
    flightName: {type: String, required: true},
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    departureTime: {type: Date, required: true},
    arrivalTime: {type: Date, required: true},
    price: {type: Number, required: true},
    status: {type: String, enum: ['Scheduled', 'On Time', 'Delayed', 'Cancelled'], default: "Scheduled"},
})

module.exports = mongoose.model("Flights", FlightSchema )