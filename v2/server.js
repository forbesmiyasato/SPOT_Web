const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://miya5288:SeniorProject@cluster0-m9wbz.mongodb.net/SPOT?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true
})

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully")
})

//const IndexRoute = require('./routes/index')
const SnapShotRoute = require('./routes/SnapShot')
const ParkingRoute = require('./routes/ParkingLot')
const UtilityRoute = require('./routes/utilities')
//app.use(IndexRoute);
app.use(SnapShotRoute);
app.use(ParkingRoute);
app.use(UtilityRoute);

// //For heroku 
// app.use(express.static(path.resolve(__dirname, '../build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})