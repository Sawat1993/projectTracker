const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req, res, next) => {
    Order.find()
    .select('_id name')
    .populate('product','name')
    .exec()
    .then(docs => {//exec() to convert response to promise,save() method by default return promise.
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc => {
                return {
                    id: doc._id,
                    name: doc.name,
                    product: doc.product,
                    forDetail: './orders/' + doc._id
                }
            })
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product', 'name price')
    .exec().then(doc => {
        if (doc) res.status(200).json(doc);
        res.status(404).json({ message: 'No Data Found.' });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

router.post('/', (req, res, next) => {
    Product.findById(req.body.product).exec().then(doc => {
        if (doc) {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                product: doc._id,
                quantuty: req.body.quantity
            });
            return order.save();
        } else {
            res.status(404).json({
                message: 'Product does not exists'
            });
        }
    }).then(doc => {
        res.status(200).json(doc)
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});

router.delete('/:orderId', (req, res, next) => {
    Order.remove({ _id: req.params.orderId }).exec().then(doc => {
        if (doc.n > 0) res.status(200).json({ message: 'Deleted' });
        res.status(404).json({ message: 'No Data Found.' });
    }).catch(error => {
        res.status(500).json({
            message: error
        })
    })
});


module.exports = router;