const MongoClient = require("mongodb").MongoClient;

const URL_TEST = "mongodb://127.0.0.1/discover";

const DB_USER = "m1p10meantokysandratra";
const DB_PASSWORD = "QdTJxNIB4E1RBmgT";
const DB_NAME = "cluster0.gezyv3f.mongodb.net";
const CONNECTION_STRING = `mongodb+srv://m1p10meantokysandratra:QdTJxNIB4E1RBmgT@cluster0.gezyv3f.mongodb.net/?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(CONNECTION_STRING);

const client = (async () => {
  await mongoClient.connect();
  console.log("Successfully connected");
  return mongoClient.db("test");
})();

module.exports = { client };
