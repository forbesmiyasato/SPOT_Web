const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkinglotSchema = new Schema(
    {
        Name: String,
        Lat: Number,
        Lng: Number,
        SnapShots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SnapShot"
            }
            , {timestamps: true}
        ],
        Description: String,
        TotalParkings: Number,
        Image: String
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Parkinglot", ParkinglotSchema);