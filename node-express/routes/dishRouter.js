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
    res.end('This URL will send all the dishes!');
})
.post((req, res, next) => {
    res.end('This URL Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('What are you trying to do? PUT operation not supported on /dishes');
})
.delete((req, res, next) => {
    res.end('Okay! If that\'s what you want. Deleting all dishes.');
});

router.route('/:dishId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('This URL will send the dish with id ' + req.params.dishId + '!');
})
.post((req, res, next) => {
    res.end('What are you trying to do? POST operation not supported on /dishes/:dishId');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('This URL will update the dish with id ' + req.params.dishId + '! Data received: ' + JSON.stringify(req.body));
})
.delete((req, res, next) => {
    res.end('Okay! If that\'s what you want. Deleting the dish with id ' + req.params.dishId + '.');
});

module.exports = router;