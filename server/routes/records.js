const express = require('express');

const recordRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

recordRoutes.route('/records').get(function (req, res) {
  let db_connect = dbo.getDb('players');
  db_connect.collection('arsenal').find({}).toArray(function (err, result) {
    if (err) throw err;
    res.json(result)
  })
});

recordRoutes.route('/players/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('arsenal').findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

module.exports = recordRoutes; 