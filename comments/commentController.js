const commentService = require("./commentService");

const addComment = async function (req, res, next) {
  const socket = req.app.get("socketio");
  try {
    const comment = await commentService.addComment(req.params.id, req.body, socket);
    res.json(comment);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getAllComments = async function (req, res, next) {
  try {
    const comments = await commentService.getAllComment(req.params.id);
    res.json(comments);
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getCommentById = async function (req, res, next) {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    res.json({ data: comment, message: "Ressource found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const updateComment = async function (req, res, next) {
  try {
    const comment = await commentService.updateComment(req.params.id, req.body);
    res.json({ data: comment, message: "Ressource updated" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteComment = async function (req, res, next) {
  try {
    const comment = await commentService.deleteComment(req.params.id);
    res.json({ data: comment.value, message: "Ressource deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  addComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
