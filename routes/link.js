const express = require("express");

const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { createLink } = require("../controllers/link");

router.param("userId", getUserById);

/**
 * @route POST /api/link/:userId
 * @description create link route
 * @access private
 */
router.post("/:userId", isSignedIn, isAuthenticated, createLink);

module.exports = router;
