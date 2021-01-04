// Use app.js to configure express
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express(); // app is the standard name

/**
 * Middleware
 * --------------
 * This should be before the endpoints.
 * Otherwise won't be called for all endpoints.
 */

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json()); // Converts body to JSON
app.use(express.static(`${__dirname}/public`)); // Expose public folder

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  // Need to call next function, otherwise middleware won't finish
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * Routers
 */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
