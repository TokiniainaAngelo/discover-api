const client = require("../config/dbConnection").client;
const collectionName = "settings";
const ObjectId = require("mongodb").ObjectId;
const settingSearchFields = ["label"];

const addSetting = async function (setting) {
  const db = await client;
  return await db.collection(collectionName).insertOne(setting);
};

const getAllSetting = async function (search) {
  const db = await client;
  return await db
    .collection(collectionName)
    .find(
      search !== ""
        ? {
            $or: settingSearchFields.map((field) => ({
              [field]: { $regex: `${search}`, $options: "i" },
            })),
          }
        : {}
    )
    .toArray();
};

const getSettingById = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOne({ _id: objId });
};

const updateSetting = async function (id, setting) {
  const objId = new ObjectId(id);
  const { _id, ..._setting } = setting;
  const db = await client;
  return await db.collection(collectionName).findOneAndUpdate({ _id: objId }, { $set: _setting }, { upsert: true });
};

const deleteSetting = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOneAndDelete({ _id: objId });
};

module.exports = {
  addSetting,
  getAllSetting,
  getSettingById,
  updateSetting,
  deleteSetting,
};
