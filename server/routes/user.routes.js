const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Header',
      'Origin, Content-Type,Accept'
    )
    next();
  })
  app.get('/api/test/all', controller.allAccess);
  app.get('/app/test/user', [authJwt.verifyToken], controller.userBoard);

  app.get('/api/test/mod', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
};

