const express = require("express");
const router = express.Router();

const {
    getUser,
    getUserById,
    getLinkList,
    getAllUsers,
    updateUser,
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
 * @route GET /api/user/links/:userId
 * @description get all the links created by the user
 * @access private
 */
router.get("/links/:userId", isSignedIn, isAuthenticated, getLinkList);

module.exports = router;
