const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user found in DB",
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encrypted_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "No users found in DB",
            });
        }

        return res.json(users);
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Not authorized to update information",
                });
            }

            user.salt = undefined;
            user.encrypted_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;

            return res.json(user);
        }
    );
};

// TODO: test this route
exports.getLinkList = (req, res) => {
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
