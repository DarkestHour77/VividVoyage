const { Schema, default: mongoose} = require("mongoose");

const BookingSchema = new Schema({
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    departureTime: {type: String, required: true},
    arrivalTime: {type: String, required: true},
    flightName: {type: String, required: true},
    flightNumber: {type: String, required: true},
    price: { type: String, required: true},
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = mongoose.model("Booking", BookingSchema )