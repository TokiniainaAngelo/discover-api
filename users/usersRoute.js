const express = require("express");
const usersController = require("./usersController");
const router = express.Router();

router.route("/").post(usersController.addUser).get(usersController.getAllUsers);
router.route("/:id").get(usersController.getUserById).put(usersController.updateUser).delete(usersController.deleteUser);
router.post("/login", usersController.getUserByLoginAndPassword);

module.exports = router;
