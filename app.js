// Use app.js to configure express
const fs = require('fs');
const express = require('express');

const app = express(); // app is the standard name

/*
 * Root Endpoint
 */
// app.get('/', (req, res) => {
//   res
//     .status(200) // 200 is the default if not used.
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

// start up server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
