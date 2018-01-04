module.exports = function (app) {
  var zs = require('../controllers/zs.server.controller')
  app.get('/zs', zs.render)
}
  