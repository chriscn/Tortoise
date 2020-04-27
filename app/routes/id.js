const express = require('express');
const axios = require('axios').default;
const router = express.Router();
const config = require('../../config.json');


let status = [];

router.get('/:id/ison', (req, res) => {
    let id = req.params.id;

    status[id] = true;

    if (config.notification_server.enabled) {
        axios.post(`http://${config.notification_server.ip}:${config.notification_server.port}/${id}`, {
            "service": "switch-service",
            "characteristic": "On",
            "value": true
        }).then(post_res => {
            res.json({
                "status": "success",
                "id": id,
                "response": post_res['body']
            });
        }).catch(post_err => {
            res.json({
                "status": "error",
                "reason": post_err.toString()
            });
        });
    } else {
        res.send({
            "id": id,
            "status": "success"
        });
    }
});

router.get('/:id/isoff', (req, res) => {
    let id = req.params.id;

    status[id] = false;

    if (config.notification_server.enabled) {

        axios.post(`http://${config.notification_server.ip}:${config.notification_server.port}/${id}`, {
            "service": "switch-service",
            "characteristic": "On",
            "value": false
        }).then(post_res => {
            res.json({
                "status": "success",
                "id": id,
                "response": post_res['body']
            });
        }).catch(post_err => {
            res.json({
                "status": "error",
                "reason": post_err.toString()
            });
        });
    } else {
        res.send({
            "id": id,
            "status": "success"
        });
    }
});

router.get('/:id/', (req, res) => {
    let id = req.params.id;

    if (status[id] == undefined || status[id] != (true || false)) {
        res.json({
            "error": "not-found",
            "id": id
        })
    } else {
        res.json({
            "id": id,
            "status": (status[id] ? "on" : "off")
        });
    }
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
            "id": id
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
