module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
    app.get('/:mm(\\d{2})-:dd(\\d{2})-:yyyy(\\d{4})', index.render);
};