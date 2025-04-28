const { Schema, default: mongoose} = require("mongoose");
const validator = require("validator")


const UserSchema = new Schema({
    email:{type: String, require: true, unique: true, validator: (value)=> validator.isEmail(value)},
    username:{type: String, require: true, unique: true, validator: (value)=> validator.isAlphanumeric(value) },
    password:{type: String, require: true},
    isAdmin:{ type: Boolean, default: false}

})

module.exports = mongoose.model("User", UserSchema)