const dal = require('./dal')();
const fileName = './token.json';


function getPhones(callback) {
    dal.readAll(fileName, (e, allPhones) => {
        if (e) {
            callback(e);
        } else {
            callback(null, allPhones);
        }
    })
}

function getPhone(phoneAge, callback) {
    dal.readOne(phoneAge, fileName, (e, singlePhone) => {
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
    dal.saveOne(userToAdd, fileName, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null, userToAdd);
        }
    })
}

function updatePhone(singlePhone, callback) {
    dal.updateOne(singlePhone, fileName, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function deletePhone(phoneAge, callback) {
    dal.deleteOne(phoneAge, fileName, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function setCount(token) {

}

module.exports = () => {
    return {
        getPhone: getPhone,
        getUserName: getPhones,
        createUser: createUser,
        deletePhone: deletePhone,
        updatePhone: updatePhone,
    }
}