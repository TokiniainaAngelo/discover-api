const client = require("../config/dbConnection").client;
const collectionName = "users";
const ObjectId = require("mongodb").ObjectId;

const addUser = async function (user) {
  const db = await client;
  return await db.collection(collectionName).insertOne(user);
};

const getAllUsers = async function () {
  const db = await client;
  return await db
    .collection(collectionName)
    .find({ role: { $ne: "Client" } })
    .toArray();
};

const getUserById = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOne({ _id: objId });
};

const getUserByLoginAndPassword = async function (info) {
  const db = await client;
  return await db.collection(collectionName).findOne(info);
};

const updateUser = async function (id, user) {
  const objId = new ObjectId(id);
  const { _id, ..._user } = user;
  const db = await client;
  return await db.collection(collectionName).findOneAndUpdate({ _id: objId }, { $set: _user }, { upsert: true });
};

const deleteUser = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOneAndDelete({ _id: objId });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  getUserByLoginAndPassword,
  updateUser,
  deleteUser,
};
