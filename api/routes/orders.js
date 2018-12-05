const express = require('express');
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth"); 
const orderController = require("../controllers/order");
const router = express.Router();


router.get('/', checkAuth, orderController.getAllOrders);

router.get('/:orderId', checkAuth, orderController.getOrders);

router.post('/', checkAuth, orderController.saveOrder);

router.delete('/:orderId', checkAuth, orderController.deleteOrder);


module.exports = router;