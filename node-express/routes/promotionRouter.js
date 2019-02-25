const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

router.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('This URL will send all the promotions!');
})
.post((req, res, next) => {
    res.end('This URL Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('What are you trying to do? PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Okay! If that\'s what you want. Deleting all promotions.');
});

router.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('This URL will send the promotion with id ' + req.params.promoId + '!');
})
.post((req, res, next) => {
    res.end('What are you trying to do? POST operation not supported on /promotions/:promoId');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('This URL will update the promotion with id ' + req.params.promoId + '! Data received: ' + JSON.stringify(req.body));
})
.delete((req, res, next) => {
    res.end('Okay! If that\'s what you want. Deleting the promotion with id ' + req.params.promoId + '.');
});

module.exports = router;