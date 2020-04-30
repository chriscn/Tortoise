const express = require('express');
const app = express();

const id = require('./routes/id');
const config = require('../config.json');
const port = config.port || 8182;

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/', id);

app.use((req, res) => {
    res.status(404).json({
        "status": "not-found",
        "error": 404
    });
});

app.listen(port);

module.exports = app;
