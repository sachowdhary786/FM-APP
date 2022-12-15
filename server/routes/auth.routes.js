const { verifySignUp } = require('../middleware');
const controller = require('../controllers/auth.controller');
const express = require('express');
const app = express()

module.exports = function () {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type,Accept'
    )
    next();
  })
  app.post('./auth/signup', [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ], controller.signup)

  app.post('/api/auth/signin', controller.signin)
  app.post('/api/auth/signout', controller.signout)
}
