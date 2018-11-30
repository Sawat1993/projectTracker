const express = require('express');
const productRoutes = require('./api/routes/product')

const app = express();

app.use('/products', productRoutes);

module.exports = app;