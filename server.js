const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3201;

const phonesBl = require('./phones-bl');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.get('/phone', (req, res) => {
    phonesBl.getPhones(function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            console.log(data);
            return res.send(data);
        }
    })
});

app.get('/phone/:id', (req, res) => {
    phonesBl.phone(req.param.id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.post('/runner', (req, res) => {
    runnerBl.createRunner(req.body, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.put('/runner/:id', (req, res) => {
    runnerBl.updateRunner(req.body, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    })
});

app.delete('/runner/:id', (req, res) => {
    runnerBl.deleteRunner(req.params.id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}!`),
);