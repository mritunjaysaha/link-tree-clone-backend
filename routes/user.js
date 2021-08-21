const express = require("express");
const router = express.Router();

const {
    getUser,
    getUserByUsername,
    getUserById,
    getAllUsers,
    updateUser,
    updateUserPhoto,
    getPhoto,
    deletePhoto,
} = require("../controllers/user");

const { isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);

// !PUBLIC ROUTES
/**
 * @route GET /api/user/
 * @description get all users
 * @access public
 */
router.get("/", getAllUsers);

/**
 * @route GET /api/user/:username
 * @description get the user details
 * @access public
 */
router.get("/userview/:username", getUserByUsername);

// !PRIVATE ROUTES
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
router.get("/photo/:username", getPhoto);

/**
 * @route PUT /api/user/photo
 * @description delete photo
 * @access private
 */
router.delete("/photo/:userId", deletePhoto);

module.exports = router;
