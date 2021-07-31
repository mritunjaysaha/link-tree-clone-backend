const express = require("express");

const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { createLink, getLinksList } = require("../controllers/link");

router.param("userId", getUserById);

/**
 * @route POST /api/link/:userId
 * @description create link route
 * @access private
 */
router.post("/:userId", isSignedIn, isAuthenticated, createLink);

/**
 * @route GET /api/user/link/:userId
 * @description get all the links created by the user
 * @access private
 */
router.get("/:userId", isSignedIn, isAuthenticated, getLinksList);

module.exports = router;
