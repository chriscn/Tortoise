const express = require('express');
const app = express();

const id = require('./routes/id');
const port = 8182;

app.use(express.json());

app.use((req, res, next) => {
   console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
   next();
});

app.use('/', id);

app.use((req, res) => {
    res.status(404).json({
        "status": "not-found",
        "error": 404
    });
});

app.listen(port);

console.log(`Tortoise ready on port ${port}, your Docker port may be different though.`);

module.exports = app;
