const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

router.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('This URL will send all the leaders!');
})
.post((req, res, next) => {
    res.end('This URL Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('What are you trying to do? PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Okay! If that\'s what you want. Deleting all leaders.');
});

router.route('/:leaderId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('This URL will send the leader with id ' + req.params.leaderId + '!');
})
.post((req, res, next) => {
    res.end('What are you trying to do? POST operation not supported on /leaders/:leaderId');
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('This URL will update the leader with id ' + req.params.leaderId + '! Data received: ' + JSON.stringify(req.body));
})
.delete((req, res, next) => {
    res.end('Okay! If that\'s what you want. Deleting the leader with id ' + req.params.leaderId + '.');
});


module.exports = router;