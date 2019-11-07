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
    console.log('all phones');
    phonesBl.getPhones(function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

//one phone - full details
app.get('/phone/:age', (req, res) => {
    console.log('one phone');
    const age = req.params.age;
    phonesBl.getPhone(age, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

//add a phone
app.post('/phone', (req, res) => {
    const phone = req.body;
    phonesBl.createPhone(phone, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

//update a phone
app.put('/phone', (req, res) => {
    console.log('put');
    const phone = req.body;
    phonesBl.updatePhone(phone, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })

});

//remove a phone
app.delete('/phone', (req, res) => {
    console.log('delete');
 /*    phonesBl.deletePhone(req.body.age, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    }) */
});

app.listen(process.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT || PORT}!`),
);
