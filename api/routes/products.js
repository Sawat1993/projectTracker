const express = require('express');
const mongoose = require('mongoose');
const checkAuth = require("../middleware/check-auth"); 

const router = express.Router();

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find().select('_id name').exec().then(docs => {//exec() to convert response to promise,save() method by default return promise.
        res.status(200).json({
            count: docs.length,
            products: docs.map(doc => {
                return {
                    id: doc._id,
                    name: doc.name,
                    forDetail: './products/' + doc._id
                }
            })
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

router.get('/:productId', (req, res, next) => {
    Product.findById(req.params.productId).exec().then(doc => {
        if (doc) res.status(200).json(doc);
        res.status(404).json({ message: 'No Data Found.' });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

router.post('/', checkAuth, (req, res, next) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(doc => {
        res.status(200).json(doc)
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

router.delete('/:productId', checkAuth, (req, res, next) => {
    Product.remove({ _id: req.params.productId }).exec().then(doc => {
        if (doc.n > 0) res.status(200).json({ message: 'Deleted' });
        res.status(404).json({ message: 'No Data Found.' });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

router.patch('/:productId', checkAuth, (req, res, next) => {
    let updateOps = {};
    let allowedUpdate = ['name', 'price'];
    for (let ops in req.body) {
        if (allowedUpdate.includes(ops)) updateOps[ops] = req.body[ops];
    }
    Product.update({ _id: req.params.productId }, { $set: updateOps }).exec().then(doc => {
        if (doc.n > 0) res.status(200).json({ message: 'Updated.' });
        res.status(404).json({ message: 'No Data Found.' });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

module.exports = router;