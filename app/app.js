const express = require('express');
const axios = require('axios').default;

const app = express();
const config = require('../config.json');
const package = require('../package.json');

const id = require('./routes/id');

let status = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/id', id);


app.get('/', (req, res) => {
    res.json({
        "currently_stored": status.length,
        "currently_on": (status.filter(v => v).length),
        "currently_off": (status.filter(v => !v).length),
        "statuses": status
    });
});

app.listen(config.port || 8080);

module.exports = app;
