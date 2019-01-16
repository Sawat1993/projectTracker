const express = require('express');

const router = express.Router();

const checkAuth = require("../middleware/check-auth"); 
const userController = require("../controllers/user");

router.post('/createUsers', checkAuth, userController.createUser);

router.post('/login', userController.login)

module.exports = router;