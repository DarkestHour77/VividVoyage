const { Schema, default: mongoose} = require("mongoose");


const UserSchema = new Schema({
    email:{type: String, require: true, unique: true},
    username:{type: String, require: true, unique: true },
    password:{type: String, require: true},

})

module.exports = mongoose.model("User", UserSchema)