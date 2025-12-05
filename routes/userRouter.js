const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const authController = require('./../controller/authController')
//USERS
router.post('/signup', authController.signup)
router.route('/').get(userController.getAllUsers).post(userController.createUser)
router.route('/:id').get(userController.getUser).patch(userController.updatedUser).delete(userController.deleteUser)

module.exports = router;