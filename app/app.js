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
    res.status(404).send("Sorry can't find that.");
});

app.listen(config.port || 8080);

module.exports = app;
