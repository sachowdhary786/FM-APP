
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db('players');
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  }
}



