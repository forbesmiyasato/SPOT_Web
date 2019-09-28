const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema(
    {
        Name: String,
        ParkingLots: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Parkinglot"
            }
        ]
    }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Location", LocationSchema);