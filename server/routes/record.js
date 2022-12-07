const express = require('express');

const recordRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

recordRoutes.route('/record').get(function (req, res) {
    let db_connect = dbo.getDb('test');
    db_connect.collection('players').find({}).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    })
});

recordRoutes.route('/players/:id').get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection('players').findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

recordRoutes.route('/players/add').post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        age: req.body.age,
        position: req.body.position
    };
    db_connect.collection('players').insertOne(myobj, function (err, res) {
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
            age: req.body.age,
            position: req.body.position
        },
    }
    db_connect.collection('players').updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log('1 document updated');
        response.json(res);
    })
})

recordRoutes.route('/:id').delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection('players').deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log('1 document deleted');
        response.json(obj);
    })
})

module.exports = recordRoutes; 