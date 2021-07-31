const mongoose = require("mongoose");

const { Schema } = mongoose;

const LinkSchema = new Schema(
    {
        name: { type: String },
        url: { type: String },
        display: { data: Buffer, contentType: String },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Link", LinkSchema);
