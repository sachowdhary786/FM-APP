const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model')
db.role = require('./role.model')

db.ROLES = ['User', 'Admin', 'Moderator'];

module.exports = db;