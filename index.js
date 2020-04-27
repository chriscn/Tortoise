const express = require('express');
const axios = require('axios').default;

const app = express();
const config = require('./config.json');
const package = require('./package.json');

let status = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
    res.json({
        "currently_stored": status.length,
        "currently_on": (status.filter(v => v).length),
        "currently_off": (status.filter(v => !v).length),
        "statuses": status
    });
});

app.get('/:id/ison', (req, res) => {
    let id = req.params.id;

    status[id] = true;

    res.json({
        "success": true,
        "id": id
    })
})

app.get('/:id/', (req, res) => {
   let id = req.params.id;

   res.json()

});

app.listen(config.port || 8080);

module.exports = app;
