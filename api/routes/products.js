const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Products get request works!'
    })
});

router.get('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Products get request works!' + req.params.productId
    })
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        product
    })
});

module.exports = router;