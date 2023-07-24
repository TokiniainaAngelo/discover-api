const express = require("express");
const notificationController = require("./notificationController");
const router = express.Router();

router.route("/").post(notificationController.addNotification).get(notificationController.getAllNotifications);
router.route("/:id").get(notificationController.getNotificationById).put(notificationController.updateNotification).delete(notificationController.deleteNotification);

module.exports = router;
