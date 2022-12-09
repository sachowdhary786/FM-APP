const express = require('express');

const postRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

postRoutes.route('/posts').get(function (req, res) {
  let db_connect = dbo.getDb('players');
  db_connect.collection('posts').find({}).toArray(function (err, result) {
    if (err) throw err;
    res.json(result)
  })
});

postRoutes.route('/players/:id').get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('posts').findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  })
})

postRoutes.route('/players/add').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    content: req.body.content,
  };
  db_connect.collection('posts').insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  })
})

postRoutes.route('/update/:id').post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      title: req.body.title,
      content: req.body.content,
    },
  }
  db_connect.collection('posts').updateOne(myquery, newvalues, function (err, res) {
    if (err) throw err;
    response.json(res);
  })
})

postRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('posts').deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  })
})

module.exports = postRoutes; 