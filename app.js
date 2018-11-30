const express = require('express');
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const morgan = require('morgan');//logging
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        res.status(200).json({});
    }
    next();
});

//routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    })
});

module.exports = app;