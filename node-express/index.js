const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// ROUTES
const dishRouter = require('./routes/dishRouter');
const promotionRouter = require('./routes/promotionRouter');
const leaderRouter = require('./routes/leaderRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

// ERROR
app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Express server faced an internal issue! Are you doing it right?</h1></body></html>');

});

// SERVER
const server = http.createServer(app);

const hostname = 'localhost';
const port = 4000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});