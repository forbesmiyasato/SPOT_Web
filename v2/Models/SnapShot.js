const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnapShotSchema = new Schema(
    {
        OpenParkings: String,
        timestamp: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("SnapShot", SnapShotSchema);