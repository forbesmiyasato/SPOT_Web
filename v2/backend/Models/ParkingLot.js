const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkinglotSchema = new Schema(
    {
        Name: String,
        Parkings: Number,
        Lat: Number,
        Lng: Number
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Parkinglot", ParkinglotSchema);