const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
// const flash = require('flash');
const passport = require('passport');
// const request = require('request');
// const expressSession = require('express-session');
const path = require('path');

const multer  = require('multer');
const bb = require('express-busboy');

// Set up the express app
const app = express();

// app.use(express.json())
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log requests to the console.
app.use(logger('dev'));

app.use(require('cookie-parser')());

bb.extend(app);
// app.use(expressSession({secret: process.env.JWT_SECRET}));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(require('flash')());
// app.use(session({secret: process.env.JWT_SECRET}))

// Require our routes into the application.
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the Kliine API!!!',
}));

module.exports = app;