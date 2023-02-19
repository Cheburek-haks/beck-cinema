const { Schema, model } = require("mongoose");

const shema = new Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        completedMeetings: { type: String },
        image: String,
        profession: { type: Schema.Types.ObjectId, ref: "Profession" },
        qualities: [{ type: Schema.Types.ObjectId, ref: "Qualities" }],
        rate: Number,
        sex: { type: String, enum: ["male", "female", "other"] },
    },
    { timestamps: true }
);

module.exports = model("User", shema);
