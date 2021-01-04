// Use app.js to configure express
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express(); // app is the standard name

/**
 * Middleware
 * --------------
 * This should be before the endpoints.
 * Otherwise won't be called for all endpoints.
 */

app.use(morgan('dev'));

app.use(express.json()); // Converts body to JSON

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
 * Tour Handlers
 */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success', // can be success, failed, error,
    requestedAt: req.requestTime,
    results: tours.length, // use when sending an array
    data: {
      tours, // same as tours: tours
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // convert to number
  const tour = tours.find((el) => el.id === id);
  //if (id > tours.length) {
  if (!tour) {
    return res
      .status(404) // 404 - Not Found
      .json({
        status: 'fail',
        message: 'Invalid ID',
      });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); // Merge two objects

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res
        .status(201) // 201 - Created
        .json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
    }
  );
};

const updateTour = (req, res) => {
  // Not actually implementing, since this is about express

  const id = req.params.id * 1; // convert to number
  if (id > tours.length) {
    return res
      .status(404) // 404 - Not Found
      .json({
        status: 'fail',
        message: 'Invalid ID',
      });
  }

  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here>' },
  });
};

const deleteTour = (req, res) => {
  // Not actually implementing, since this is about express

  const id = req.params.id * 1; // convert to number
  if (id > tours.length) {
    return res
      .status(404) // 404 - Not Found
      .json({
        status: 'fail',
        message: 'Invalid ID',
      });
  }

  res
    .status(204) // 204 - No Content
    .json({
      status: 'success',
      data: null,
    });
};

//
/**
 * Tour Endpoints
 * ----------------------
 * Use : to define param.
 * Put ? at end of param for optional param
 */

const tourRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

/**
 * User Handlers
 */

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined.',
  });
};

/**
 * Users Routes
 */

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

/**
 * Routers
 */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

/**
 * Start Server
 */
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
