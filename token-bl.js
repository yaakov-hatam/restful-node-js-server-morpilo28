const dal = require('./dal')('./token.json');

function getPhones(callback) {
    dal.readAll((e, allPhones) => {
        if (e) {
            callback(e);
        } else {
            callback(null, allPhones);
        }
    })
}

function getPhone(phoneAge, callback) {
    dal.readOne(phoneAge, (e, singlePhone) => {
        if (e) {
            callback(e);
        } else {
            if (!singlePhone.carrier) {
                singlePhone.carrier = '';
            } else {
                singlePhone.carrier = singlePhone.carrier;
            }
            callback(null, singlePhone);
        }
    })

}

function createUser(userToAdd, callback) {
    dal.saveOne(userToAdd, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null, userToAdd);
        }
    })
}

function updatePhone(singlePhone, callback) {
    dal.updateOne(singlePhone, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function deletePhone(phoneAge, callback) {
    dal.deleteOne(phoneAge, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

module.exports.getPhone = getPhone;
module.exports.getUserName = getPhones;
module.exports.createUser = createUser;
module.exports.deletePhone = deletePhone;
module.exports.updatePhone = updatePhone;