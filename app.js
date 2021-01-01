// Use app.js to configure express
const fs = require('fs');
const express = require('express');

const app = express(); // app is the standard name

/**
 * Middleware
 */
app.use(express.json()); // Converts body to JSON

/*
 * Root Endpoint
 */
// app.get('/', (req, res) => {
//   res
//     .status(200) // 200 - OK is the default if not used.
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint.');
// });

/*
 * Tours Endpoint
 */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success', // can be success, failed, error,
    results: tours.length, // use when sending an array
    data: {
      tours, // same as tours: tours
    },
  });
});

app.get(
  '/api/v1/tours/:id', // Use : to define param; put ? at end of param for optional param
  (req, res) => {
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
  }
);

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// start up server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
