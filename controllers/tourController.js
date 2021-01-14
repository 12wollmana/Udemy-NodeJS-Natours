/**
 * Tour Handlers
 */
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // Build the Query
    // - Basic Filtering
    const queryObj = { ...req.query }; // Makes a hard copy
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // - Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // gte -> $gte

    let query = Tour.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Execute the Query
    const tours = await query;

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
