const express = require("express");
const commentController = require("./commentController");
const router = express.Router();

router.route("/").post(commentController.addComment).get(commentController.getAllComments);
router.route("/:id").get(commentController.getCommentById).put(commentController.updateComment).delete(commentController.deleteComment);

module.exports = router;
