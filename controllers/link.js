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
    const { username } = req.params;
    User.findOne({ username })
        .populate("links")
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    message: "Failed to get links",
                    error: err.message,
                });
            }

            return res.json({ links: user.links });
        });
};

exports.updateLink = (req, res) => {
    Link.findByIdAndUpdate(req.params.linkId, req.body)
        .then((data) => {
            res.json({ message: "link updated successfully", data });
        })
        .catch((err) =>
            res
                .status(400)
                .json({ error: "Failed to update link", message: err.message })
        );
};

exports.deleteLink = (req, res) => {
    const { userId, linkId } = req.params;

    User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { links: linkId } },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Not authorized to update information",
                });
            }

            Link.findByIdAndRemove(linkId)
                .then((data) => {
                    user.salt = undefined;
                    user.encrypted_password = undefined;
                    user.createdAt = undefined;
                    user.updatedAt = undefined;

                    return res.json({
                        message: "Link deleted successfully",
                        data,
                        user,
                    });
                })
                .catch((err) =>
                    res.json(404).json({
                        error: "link not found in DB",
                        message: err.message,
                    })
                );
        }
    );
};
