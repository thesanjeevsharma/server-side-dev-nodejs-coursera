const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('../cors');

const Promos = require('../models/promo.model');

const router = express.Router();

router.use(bodyParser.json());

router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get((req,res,next) => {
    Promos.find({})
    .then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.create(req.body)
    .then((promo) => {
        console.log('Promo Created ', promo);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('What are you trying to do? PUT operation not supported on /promotions');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);   
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Promos.findById(req.params.promoId)
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('What are you trying to do? POST operation not supported on /promotions/:promoId');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new : true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = router;