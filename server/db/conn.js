
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://saad:Zaina78602@cluster0.676d1fs.mongodb.net/players/arsenal?retryWrites=true&w=majority";
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



