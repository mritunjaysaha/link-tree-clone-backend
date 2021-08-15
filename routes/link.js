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

/**
 * @route POST /api/link/:userId
 * @description create link
 * @access private
 */
router.post("/:userId", isSignedIn, isAuthenticated, createLink);

/**
 * @route GET /api/link/:userId
 * @description get all the links created by the user
 * @access private
 */
router.get("/:userId", isSignedIn, isAuthenticated, getLinksList);

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
