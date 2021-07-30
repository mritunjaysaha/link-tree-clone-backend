const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signUp = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }

    const user = new User(req.body);

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save in DB",
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

exports.signIn = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: error.array()[0].msg,
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email doesn't exist",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match",
            });
        }

        // create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        // put token in cookie
        res.cookie("token", token, { expire: new Date() + 99999 });

        // send response to frontend
        const { _id, name, email } = user;

        return res.json({ token, user: { _id, name, email } });
    });
};

exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "sign out" });
};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ["sha1", "RS256", "HS256"],
});

exports.isAuthenticated = (req, res, next) => {
    // req.profile is set up from frontend
    // req.auth is set up by top middleware
    // if profile._id sent from frontend is same as auth._id then
    // the user to change things from his own account

    let checker = req.profile && req.auth && req.profile._id === req.auth._id;

    if (!checker) {
        return res.status(403).json({ error: "ACCESS DENIED" });
    }

    next();
};
