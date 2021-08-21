const express = require("express");

const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
    createLink,
    getLinksList,
    updateLink,
    deleteLink,
} = require("../controllers/link");

router.param("userId", getUserById);

// !PUBLIC ROUTES
/**
 * @route GET /api/link/:username
 * @description get all the links created by the user
 * @access public
 */
router.get("/:username", getLinksList);

// !PRIVATE ROUTES
/**
 * @route POST /api/link/:userId
 * @description create link
 * @access private
 */
router.post("/:userId", isSignedIn, isAuthenticated, createLink);

/**
 * @route PUT /api/link/:userId/:linkId
 * @description update link
 * @access private
 */
router.put("/:userId/:linkId", isSignedIn, isAuthenticated, updateLink);

/**
 * @route DELETE /api/link/:userId/:linkId
 * @description  delete link
 * @access private
 */
router.delete("/:userId/:linkId", isSignedIn, isAuthenticated, deleteLink);

module.exports = router;
