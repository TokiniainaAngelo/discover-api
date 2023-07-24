const client = require("../config/dbConnection").client;
const collectionName = "comments";
const ObjectId = require("mongodb").ObjectId;
const commentSearchFields = ["label"];

const addComment = async function (comment) {
  const db = await client;
  return await db.collection(collectionName).insertOne(comment);
};

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
};

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
