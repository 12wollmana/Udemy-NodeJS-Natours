/**
 * Tour Handlers
 */
const Tour = require('../models/tourModel');

exports.checkBody = (req, res, next) => {
  const { body } = req;
  if (!body.name || !body.price) {
    return res
      .status(400) // 400 - Bad Request
      .json({
        status: 'fail',
        message: 'Missing name or price.',
      });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success', // can be success, failed, error,
    requestedAt: req.requestTime,
    // results: tours.length, // use when sending an array
    // data: {
    //   tours, // same as tours: tours
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1; // convert to number
  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: { tour },
  // });
};

exports.createTour = (req, res) => {
  // res
  //       .status(201) // 201 - Created
  //       .json({
  //         status: 'success',
  //         data: {
  //           tour: newTour,
  //         },
  //       });
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
