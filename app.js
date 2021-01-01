// Use app.js to configure express
const fs = require('fs');
const express = require('express');

const app = express(); // app is the standard name

/**
 * Middleware
 */
app.use(express.json()); // Converts body to JSON

/**
 * Tour Handlers
 */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success', // can be success, failed, error,
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
//app.get('/api/v1/tours', getAllTours);
//app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// start up server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
