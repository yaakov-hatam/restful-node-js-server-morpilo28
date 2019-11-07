const dal = require('./dal');

function getPhone(age, callback) {
    /* callback(null, { "id": age, "name": "abc", "km": 42 }); */

    dal.readOne(age, (e, onePhone) => {
        if (e) {
            callback(e);
        } else {
            callback(null, onePhone);
        }
    })

}

function getPhones(callback) {
    dal.readAll((e, allPhones) => {
        if (e) {
            callback(e);
        } else {
            callback(null, allPhones);
        }
    })
}

function createPhone(phone, callback) {
    dal.saveOne(phone, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function updatePhone(phone, callback) {
    dal.updateOne(phone, (e, allPhones) => {
        if (e) {
            callback(e);
        } else {
            callback(null, allPhones);
        }
    })
}

function deletePhone(phone, callback) {
    dal.deleteOne(phone, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

module.exports.getPhone = getPhone;
module.exports.getPhones = getPhones;
module.exports.createPhone = createPhone;
module.exports.deletePhone = deletePhone;
module.exports.updatePhone = updatePhone;