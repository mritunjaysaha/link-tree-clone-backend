const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");
const { profile } = require("console");

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

exports.updateUserPhoto = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with image",
            });
        }
        // updating code
        let profile = req.profile;
        profile = _.extend(profile, fields);

        // handle file
        if (file.photo) {
            profile.photo.data = fs.readFileSync(file.photo.path);
            profile.photo.contentType = file.photo.type;

            console.log(profile.photo);

            console.log({ profile });
        }

        User.findByIdAndUpdate(
            { _id: req.profile._id },
            { $set: { photo: profile.photo } },
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
    });
};
