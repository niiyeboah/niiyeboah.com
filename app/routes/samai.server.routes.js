module.exports = function(app) {
    var samai = require('../controllers/samai.server.controller');
    app.get('/samai/', (req, res) => {
        if (req.url.slice(-1) !== '/') res.redirect('/samai/');
        else samai.render(req, res);
    });
    app.get('/samai/:mm(\\d{2})-:dd(\\d{2})-:yyyy(\\d{4})', samai.render);
    app.get('/samai/:mm(\\d{2})-:dd(\\d{2})-:yyyy(\\d{4}).:n', samai.render);
};