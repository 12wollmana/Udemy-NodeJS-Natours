/**
 * User Endpoints
 * --------------
 * Use : to define param.
 * Put ? at end of param for optional param
 */
const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
