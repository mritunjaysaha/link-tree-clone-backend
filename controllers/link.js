const Link = require("../models/link");
const User = require("../models/user");

exports.createLink = (req, res) => {
    const newLink = new Link(req.body);

    newLink.save();

    User.findByIdAndUpdate(
        req.profile._id,
        { $push: { links: newLink._id } },
        { new: true, upsert: true },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    message: "Failed to update link",
                    error: err.message,
                });
            }

            return res.json(user);
        }
    );
};

exports.getLinksList = (req, res) => {
    User.findById(req.profile._id)
        .populate("links")
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "Failed to get links",
                    error: err.message,
                });
            }

            return res.json(user);
        });
};

exports.updateLink = (req, res) => {};

exports.deleteLink = (req, res) => {};
