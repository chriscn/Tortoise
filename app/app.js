const express = require('express');
const axios = require('axios').default;

const app = express();
const config = require('../config.json');
const package = require('../package.json');

const id = require('./routes/id');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/', id);

app.use((req, res, next) => {
    res.status(404).json({
        "status": "not-found",
        "error": 404
    });
});

app.listen(config.port || 8080);

module.exports = app;
