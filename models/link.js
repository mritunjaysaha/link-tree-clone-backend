const mongoose = require("mongoose");

const { Schema } = mongoose;

const LinkSchema = new Schema(
    {
        order: {
            type: Number,
            default: 0,
        },
        name: {
            type: String,
        },
        url: {
            type: String,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        thumbnail: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Link", LinkSchema);
