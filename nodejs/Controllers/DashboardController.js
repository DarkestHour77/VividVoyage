const BookingSchema = require("../Model/BookingSchema");
const CitiesSchema = require("../Model/CitiesSchema");

async function DashboardController(req, res){
    
    const allBookings = await BookingSchema.find({});
    res.json(allBookings)

}


module.exports = DashboardController ;