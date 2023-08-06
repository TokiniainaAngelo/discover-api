const client = require("../config/dbConnection").client;
const collectionName = "comments";
const ObjectId = require("mongodb").ObjectId;
const notificationService = require("../notification/notificationService");

const addComment = async function (id, comment, socket) {
  const db = await client;
  const user = await db.collection("users").findOne({ _id: new ObjectId(comment.user._id) });
  comment.date = new Date().toISOString();
  comment.user = user._id;
  const newComment = await db.collection(collectionName).insertOne(comment);
  const site = await db.collection("sites").findOne({ _id: ObjectId(id) });
  await db.collection("sites").updateOne({ _id: ObjectId(id) }, { $push: { comments: newComment.insertedId } });
  comment.user = user;
  const notification = {
    siteId: id,
    content: `${user.fullName} a commenté dans ${site.name}`,
    createdAt: new Date(),
  };
  await notificationService.addNotification(notification, socket);
  return comment;
};

const getAllComment = async function (id) {
  const db = await client;
  const site = await db.collection("sites").findOne({ _id: new ObjectId(id) });
  const commentIds = site.comments || [];
  return await db
    .collection(collectionName)
    .aggregate([
      { $match: { _id: { $in: commentIds } } },
      { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { _id: 1, value: 1, date: 1, user: { _id: 1, fullName: 1 } } },
    ])
    .toArray();
};

/*
const getAllComment = async function (search) {
  const db = await client;
  return await db
    .collection(collectionName)
    .find(
      search !== ""
        ? {
            $or: commentSearchFields.map((field) => ({
              [field]: { $regex: `${search}`, $options: "i" },
            })),
          }
        : {}
    )
    .toArray();
};*/

const getCommentById = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOne({ _id: objId });
};

const updateComment = async function (id, comment) {
  const objId = new ObjectId(id);
  const { _id, ..._comment } = comment;
  const db = await client;
  return await db.collection(collectionName).findOneAndUpdate({ _id: objId }, { $set: _comment }, { upsert: true });
};

const deleteComment = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOneAndDelete({ _id: objId });
};

module.exports = {
  addComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment,
};
