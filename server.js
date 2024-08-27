const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/DBconneection');
const dotenv = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 5000;



// using this middleware to prase the incoming data from client to serer in body in json format
// path (contactController => POST )
app.use(express.json());

// by using the "use" keyword we create middle ware in which "/api.contacts" is common for all and then
// passing the require parameter to "./routes/contactRoutes " which  have all routing points
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));//for user login and authentication

//middleware errorHandler
app.use(errorHandler);

app.listen(port, () =>{
    console.log(`I am Using Express on ${port}`);
});