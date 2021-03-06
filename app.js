const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./api/routes/users');
const projectRoutes = require('./api/routes/projects');

mongoose.connect('mongodb://sawatantra:' + process.env.mongoPwd + '@cluster0-shard-00-00-obwaa.mongodb.net:27017,cluster0-shard-00-01-obwaa.mongodb.net:27017,cluster0-shard-00-02-obwaa.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    {
        useNewUrlParser: true
    }).then().catch(error => {
        console.log(error);

    });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        res.status(200).json({});
    }
    next();
});

//routes which should handle request
app.use('/user', userRoutes);
app.use('/projects', projectRoutes);

app.use((req, res, next) => {
    const error = new Error("Resource Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    })
});

module.exports = app;