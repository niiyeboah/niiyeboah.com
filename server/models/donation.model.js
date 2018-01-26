var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    amount: Number,
    completed: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
