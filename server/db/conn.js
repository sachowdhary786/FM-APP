
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://saad:Zaina78602@cluster0.676d1fs.mongodb.net/players/arsenal?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (db) {
                _db = db.db('players');
                console.log('Succesful connection to MongoDB');
            }
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
}


