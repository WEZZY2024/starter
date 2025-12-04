const express = require('express');

const router = express.Router();
const userController = require('../controller/userController')
//USERS
router.route('/').get(userController.getAllUsers).post(userController.createUser)
router.route('/:id').get(userController.getUser).patch(userController.updatedUser).delete(userController.deleteUser)

module.exports = router;