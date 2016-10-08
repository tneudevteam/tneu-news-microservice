const Promise = require('bluebird');
const MongoClient = require('mongodb').MongoClient;
const DB = MongoClient.connect(process.env.MONGO_URL, {promiseLibrary: Promise}).catch(error => {
  console.error(`Error connecting to DB: ${error.message}. Shutting down in 2s`);
  setTimeout(() => {
    process.exit(1);
  }, 2000);
});

module.exports = DB;
