const express = require("express");
const router = express.Router();

const {
    getUser,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserPhoto,
    getPhoto,
} = require("../controllers/user");

const { isAuthenticated, isSignedIn } = require("../controllers/auth");

const User = require("../models/user");

router.param("userId", getUserById);

/**
 * @route GET /api/user/
 * @description get all users
 * @access public
 */
router.get("/", getAllUsers);

/**
 * @route GET /api/user/:userId
 * @description get the user details
 * @access private
 */
router.get("/:userId", isSignedIn, isAuthenticated, getUser);

/**
 * @route PUT /api/user/:userId
 * @description update user details
 * @access private
 */
router.put("/:userId", isSignedIn, isAuthenticated, updateUser);

/**
 * @route POST /api/user/photo/:userId
 * @description add photo
 * @access private
 */
router.post("/photo/:userId", isSignedIn, isAuthenticated, updateUserPhoto);

/**
 * @route GET /api/user/photo/:username
 * @description read photo
 * @access public
 */
// router.get("/photo/:username", getPhoto);

router.get("/photo/:userId", (req, res) => {
    User.findById(req.profile._id, (err, user) => {
        if (err) {
            res.status(404).json({ error: "User not found" });
        }

        console.log({ user });
        res.json(user);
    });
});

module.exports = router;
