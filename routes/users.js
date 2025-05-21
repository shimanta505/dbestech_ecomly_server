const express = require('express');
const router = express.Router();
const usersController  = require('../controllers/users_controller');


router.get('/',usersController.getUsers);
router.get('/:id',usersController.getUsersById);
router.put('/:id',usersController.updateUser);

module.exports = router;