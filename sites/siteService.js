const client = require("../config/dbConnection").client;
const collectionName = "sites";
const ObjectId = require("mongodb").ObjectId;
const siteSearchFields = ["name", "description", "region", "localisation"];

const addSite = async function (site) {
  const db = await client;
  return await db.collection(collectionName).insertOne(site);
};

const getAllSite = async function (search) {
  const db = await client;

  return await db
    .collection(collectionName)
    .find(
      search
        ? {
            $or: siteSearchFields.map((field) => ({
              [field]: { $regex: `${search}`, $options: "i" },
            })),
          }
        : {}
    )
    .toArray();
};

const getSiteById = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOne({ _id: objId });
};

const updateSite = async function (id, site) {
  const objId = new ObjectId(id);
  const { _id, ..._site } = site;
  const db = await client;
  return await db.collection(collectionName).findOneAndUpdate({ _id: objId }, { $set: _site }, { upsert: true });
};

const deleteSite = async function (id) {
  const objId = new ObjectId(id);
  const db = await client;
  return await db.collection(collectionName).findOneAndDelete({ _id: objId });
};

module.exports = {
  addSite,
  getAllSite,
  getSiteById,
  updateSite,
  deleteSite,
};
