const express = require('express');
const router = express.Router();

let status = [];

router.get('/:id/ison', (req, res) => {
    let id = req.params.id;

    status[id] = true;

    res.json({
        "success": true,
        "id": id
    })
})

router.get('/:id/', (req, res) => {
    let id = req.params.id;

    res.json()

});

router.get('/:id/delete', (req, res) => {
    let id = req.params.id;

    if (status[id] === undefined || status[id] == "") { // statuses do not contain that id
        res.json({
            "status": "not-found",
            "id": id
        })
    } else {
        status.splice(status.indexOf(id), 1);
        res.json({
            "status": "success",
            "id" : id
        })
    }
})

router.get('/', (req, res) => {
    res.json({
        "currently_stored": status.length,
        "currently_on": (status.filter(v => v).length),
        "currently_off": (status.filter(v => !v).length),
        "statuses": status
    });
});

module.exports = router
