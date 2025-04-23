const CitiesSchema = require("../Model/CitiesSchema");

async function DashboardController(req, res){
    
    const allBookings = await CitiesSchema.find({});
    res.json(allBookings)

}


// async function getAllBookings(req, res){
    
//     const params = req.params;
//     const id = params.id;
    
//     try{
//         const response = await CitiesSchema.findById(id);
//         res.status(200).json(response)
//     }catch(err){
//         res.status(400).json(err)
//     }

// } 

module.exports = DashboardController ;