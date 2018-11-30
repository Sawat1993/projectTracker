const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Products get request works!'
    })
});

router.get('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Products posts request works!' + req.params.productId
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Products posts request works!'
    })
});

module.exports = router;