module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    var donate = require('../controllers/donate.server.controller');
    app.get('/', index.render);
    app.get('/donate/', donate.render);
};
