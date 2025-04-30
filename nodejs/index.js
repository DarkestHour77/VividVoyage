const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const server = express();
const PORT = 8080;
const CityRoute = require("./Routes/CityRoute")
const AdminRoute = require("./Routes/AdminRoute")
const AuthRoute = require("./Routes/AuthRoute")
const BookingRoute = require("./Routes/BookingRoute")
const dotenv = require("dotenv")


dotenv.config()

server.use(cors());
server.use(express.json());

//Routes
server.use("/flights/", CityRoute ) 
server.use("/auth/", AuthRoute ) 
server.use("/flights/cities/", BookingRoute)
server.use("/admin/", AdminRoute)



// Connection to DB
const databaseURL = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;
const connectionUrl = databaseURL + databaseName;


mongoose.connect(connectionUrl)
    .then(()=> console.log("connected to db!"));

server.listen(PORT,()=>{
    console.log("server runing at port : ",PORT);
})

