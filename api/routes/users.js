const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();

const Users = require('../models/user');


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                message: 'unable to generate password'
            })
        } else {
            const user = new Users({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
            console.log(user);
            user.save()
                .then(doc => {
                    res.status(200).json({
                        messgae: 'User created'
                    })
                })
                .catch(error => {
                    res.status(500).json({
                        message: error
                    })
                });
        }
    })
});

router.post('/login', (req, res, next) => {
    Users.find({ email: req.body.email })
        .exec()
        .then(doc => {
            if (doc.length < 1) {
                res.status(410).json({
                    message: 'Auth failed'
                })
            } else {
                bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
                    console.log(err)
                    if (result) {
                        res.status(200).json({
                            message: 'Authenticated'
                        })
                    } else {
                        res.status(410).json({
                            message: 'Auth failed'
                        })
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: error
            })
        });
})

module.exports = router;