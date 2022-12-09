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

recordRoutes.route('/players/add').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    surname: req.body.surname,
    nationality: req.body.nationality,
    position: req.body.position,
    number: req.body.number,
    image: req.body.image,
  };
  db_connect.collection('arsenal').insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  })
})

recordRoutes.route('/update/:id').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      name: req.body.name,
      surname: req.body.surname,
      nationality: req.body.nationality,
      position: req.body.position,
      number: req.body.number,
      image: req.body.image,
    },
  }
  db_connect.collection('arsenal').updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    response.json(res);
  })
})

recordRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('arsenal').deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  })
})

module.exports = recordRoutes; 