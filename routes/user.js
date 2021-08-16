const express = require("express");
const router = express.Router();

const {
    getUser,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserPhoto,
} = require("../controllers/user");

const { isAuthenticated, isSignedIn } = require("../controllers/auth");

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

module.exports = router;
