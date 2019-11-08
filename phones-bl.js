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

function updatePhone(singlePhone, callback) {
    if(!singlePhone.carrier){
        singlePhone.carrier = '';
    }
    if(!singlePhone.imageUrl){
        singlePhone.imageUrl = '';
    }
    if(!singlePhone.name){
        singlePhone.name = '';
    }
    if(!singlePhone.snippet){
        singlePhone.snippet = '';
    }
    dal.updateOne(singlePhone, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function deletePhone(phoneAge, callback) {
    phoneAge = phoneAge.toString();
    dal.deleteOne(phoneAge, (e) => {
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