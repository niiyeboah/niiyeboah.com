var express = require('axios');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config');
var donations = require('../routes/donation.routes');

module.exports = function() {
    var app = express();

    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
    else if (process.env.NODE_ENV === 'production') app.use(compress());

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.set('views', './server/views');
    app.set('view engine', 'ejs');

    app.get('/', (req, res) => {
        res.render('index', {
            title: 'niiyeboah.com | Donate'
        });
    });

    app.get('/callback', (req, res) => {
        if (req.query.pay_token && req.query.status === 0) {
            res.send('Donation Completed');
            axios
                .post('https://app.slydepay.com.gh/api/merchant/transaction/confirm', {
                    emailOrMobileNumber: config.slydePayAPI.mobileNumber,
                    merchantKey: config.slydePayAPI.apiKey,
                    payToken: req.query.pay_token
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
        } else res.send('Donation Incomplete');
    });

    app.use('/donation', donations);

    app.use(express.static('./public'));

    return app;
};
