const client = require("../config/dbConnection").client;
const collectionName = "notifications";
const ObjectId = require("mongodb").ObjectId;
const notificationSearchFields = ["label"];

const addNotification = async function (notification) {
  const db = await client;
  return await db.collection(collectionName).insertOne(notification);
};

const getAllNotification = async function (search) {
  const db = await client;
  return await db
    .collection(collectionName)
    .find(
      search !== ""
        ? {
            $or: notificationSearchFields.map((field) => ({
              [field]: { $regex: `${search}`, $options: "i" },
            })),
          }
        : {}
    )
    .toArray();
};

const getNotificationById = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOne({ _id: objId });
};

const updateNotification = async function (id, notification) {
  const objId = new ObjectId(id);
  const { _id, ..._notification } = notification;
  const db = await client;
  return await db.collection(collectionName).findOneAndUpdate({ _id: objId }, { $set: _notification }, { upsert: true });
};

const deleteNotification = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOneAndDelete({ _id: objId });
};

module.exports = {
  addNotification,
  getAllNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
