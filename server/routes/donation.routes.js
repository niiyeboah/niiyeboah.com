var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Donation = require('../models/donation.model.js');

/* GET ALL DONATIONS */
router.get('/', (req, res, next) => {
    Donation.find((err, donation) => {
        if (err) return next(err);
        res.json(donation);
    });
});

/* GET SINGLE DONATIONS BY ID */
router.get('/:id', (req, res, next) => {
    Donation.findById(req.params.id, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE DONATIONS */
router.post('/', (req, res, next) => {
    Donation.create(req.body, (err, post) => {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE DONATIONS */
router.put('/:id', (req, res, next) => {
    Donation.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE DONATIONS */
router.delete('/:id', function(req, res, next) {
    Donation.findByIdAndRemove(req.params.id, req.body, function(err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
