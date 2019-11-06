const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3201;
const phonesBl = require('./phones-bl');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

//full list (retrieve an index of resources or an individual resource)
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

//one phone (retrieve an index of resources or an individual resource)
app.get('/phone/:age', (req, res) => {
    console.log('one phone');
    const age = req.param.age;
    phonesBl.getPhone(age, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

//add phone (create a resource or generally provide data)
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

//create or replace a resource
app.put('/phone/:age', (req, res) => {
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

//remove a resource
app.delete('/phone/:age', (req, res) => {
    console.log('delete');
    phonesBl.deletePhone(req.params.id, function (e, data) {
        if (e) {
            return res.status(500).send();
        } else {
            return res.send(data);
        }
    })
});

app.listen(proccess.env.PORT || PORT, () =>
    console.log(`Example app listening on port ${proccess.env.PORT || PORT}!`),
);