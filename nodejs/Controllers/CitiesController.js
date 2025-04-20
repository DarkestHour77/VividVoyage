const CitySchema = require("../Model/CitiesSchema")

async function TravelEntryData (req, res) {
    try {
        const city = new CitySchema({
            from: req.body.from,
            to: req.body.to,
            departDate: req.body.departDate,
            returnDate: req.body.returnDate,
        });
        await city.save();
        res.status(201).json({message: "City saved"});
    } catch(error) {
        console.error("Error details:", error);
        res.status(500).json({error: error.message});    }
};

module.exports = { TravelEntryData }