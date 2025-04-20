const { Schema, default: mongoose} = require("mongoose");

const CitiesSchema = new Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    departDate: {type: String, required: true},
    returnDate: {type: String, required: true}
})

module.exports = mongoose.model("CitySchema", CitiesSchema )