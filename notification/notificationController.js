const notificationService = require("./notificationService");

const addNotification = async function (req, res, next) {
  try {
    const notification = await notificationService.addNotification(req.body);
    res.json({ data: notification.value, message: "Ressource created" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getAllNotifications = async function (req, res, next) {
  const { search } = req.query;
  try {
    const notifications = await notificationService.getAllNotification(search);
    res.json(notifications);
  } catch (err) {
    res.json(err.message);
  }
};

const getNotificationById = async function (req, res, next) {
  try {
    const notification = await notificationService.getNotificationById(req.params.id);
    res.json({ data: notification, message: "Ressource found" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const updateNotification = async function (req, res, next) {
  try {
    const notification = await notificationService.updateNotification(req.params.id, req.body);
    res.json({ data: notification, message: "Ressource updated" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteNotification = async function (req, res, next) {
  try {
    const notification = await notificationService.deleteNotification(req.params.id);
    res.json({ data: notification.value, message: "Ressource deleted" });
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = {
  addNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
