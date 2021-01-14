/**
 * Tour Handlers
 */
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // Execute the Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // Send Response
    res.status(200).json({
      status: 'success', // can be success, failed, error,
      results: tours.length, // use when sending an array
      data: {
        tours, // same as tours: tours
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    // Equivalent to: Tour.findOne({_id: req.params.id})
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // Create does the same as new obj and saving.
    const newTour = await Tour.create(req.body);

    res
      .status(201) // 201 - Created
      .json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
  } catch (err) {
    res
      .status(400) // 400 - Bad Request
      .json({
        status: 'fail',
        message: err,
      });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res
      .status(204) // 204 - No Content
      .json({
        status: 'success',
        data: null,
      });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
