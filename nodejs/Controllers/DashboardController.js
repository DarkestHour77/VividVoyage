const CitiesSchema = require("../Model/CitiesSchema");

async function DashboardController(req, res){
    
    const allBookings = await CitiesSchema.find({});
    res.json(allBookings)

}


module.exports = DashboardController ;