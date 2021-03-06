const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');

createUser = (req, res, next) => {
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
};

login = (req, res, next) => {
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
                        const token = jwt.sign({
                            email: doc[0].email,
                            userId: doc[0]._id
                        }, process.env.JWT_KEY, {
                            expiresIn: "1h"
                        })
                        res.status(200).json({
                            message: 'Authenticated',
                            token
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
};

module.exports = {
    createUser,
    login
}