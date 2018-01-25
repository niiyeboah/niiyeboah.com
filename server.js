process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');
var uri = require('./server/config/config').db.uri;
var express = require('./server/config/express');
var app = express();

mongoose.Promise = global.Promise;
mongoose
    .connect(uri)
    .then(() => console.log('connection succesful'))
    .catch(err => console.error(err));

app.listen(process.env.PORT);

module.exports = app;

console.log('Listening on port ' + process.env.PORT);
