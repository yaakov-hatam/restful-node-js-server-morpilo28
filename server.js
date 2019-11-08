const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3201;
const phonesBl = require('./phones-bl');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//full list
app.get('/phone', (req, res) => {
    phonesBl.getPhones((e, allPhones) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(allPhones);
        }
    })
});

//one phone - full details
app.get('/phone/:age', (req, res) => {
    const phoneAge = req.params.age;
    phonesBl.getPhone(phoneAge, (e, singlePhone) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(singlePhone);
        }
    })
});

//add a phone
app.post('/phone', (req, res) => {
    const phoneToAdd = req.body;
    phonesBl.createPhone(phoneToAdd, (e) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send();
        }
    })
});

//update a phone
app.put('/phone', (req, res) => {
    const singlePhone = req.body;
    phonesBl.updatePhone(singlePhone, (e) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send();
        }
    })
});

//delete a phone
app.delete('/phone', (req, res) => {
    const phoneAge = req.body.age;
    phonesBl.deletePhone(phoneAge, (e) => {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send();
        }
    })
});

app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`),
);
