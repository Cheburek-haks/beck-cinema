const { Schema, model } = require("mongoose");

const shema = new Schema(
    {
        name: { type: String },
        occupied: { type: Boolean },
        phone: { type: Number },
        count: { type: Number },
    },
    { timestamps: true }
);

module.exports = model("Places", shema);
