const BookingSchema = require("../Model/BookingSchema");

async function DashboardController(req, res){
    
    const allBookings = await BookingSchema.find({userId: req.userId.id});
    res.json(allBookings)

}


module.exports = DashboardController ;