const express = require('express');

const router = express.Router();

//handeling incoming get request for /orders
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'orders get request works!'
    })
});

router.get('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'order get request works!' + req.params.productId
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'order posts request works!'
    })
});

module.exports = router;