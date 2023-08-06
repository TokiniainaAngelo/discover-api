const express = require("express");
const commentController = require("./commentController");
const router = express.Router();

router.route("/:id").get(commentController.getCommentById).put(commentController.updateComment).delete(commentController.deleteComment);
router.route("/site/:id").post(commentController.addComment).get(commentController.getAllComments)

module.exports = router;
