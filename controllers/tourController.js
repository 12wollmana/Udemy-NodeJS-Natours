/**
 * Tour Handlers
 */
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  const id = req.params.id * 1; // convert to number
  if (id > tours.length) {
    return res
      .status(404) // 404 - Not Found
      .json({
        status: 'fail',
        message: 'Invalid ID',
      });
  }
  next();
};

exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // convert to number
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  // Not actually implementing, since this is about express
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here>' },
  });
};

exports.deleteTour = (req, res) => {
  // Not actually implementing, since this is about express
  res
    .status(204) // 204 - No Content
    .json({
      status: 'success',
      data: null,
    });
};
