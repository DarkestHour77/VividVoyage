const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const server = express();
const PORT = 8080;
const { faker } = require("@faker-js/faker");
const bodyParser = require("body-parser");
// const { TravelEntryData } = require('./Controllers/CitiesController');
const CityRoute = require("./Routes/CityRoute")
const LoginRoute = require("./Routes/LoginRoute")
const AuthRoute = require("./Routes/AuthRoute")
const dotenv = require("dotenv")


dotenv.config()

server.use(cors());
server.use(express.json());

//Middleware
server.use((req, res, next)=>{
    req.PASSWORD = process.env.PASSWORD;
    next();
})

//Routes
server.use("/flights/", CityRoute ) 
// server.use("/api/", LoginRoute ) 
server.use("/auth/", AuthRoute ) 



// Connection to DB
const databaseURL = process.env.DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;
const connectionUrl = databaseURL + databaseName;


mongoose.connect(connectionUrl)
    .then(()=> console.log("connected to db!"));

server.listen(PORT,()=>{
    console.log("server runing at port : ",PORT);
})

