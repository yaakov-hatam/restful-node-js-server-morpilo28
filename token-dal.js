const fs = require('fs');

function readAll(callback) {
    fs.readFile(fileName, (e, d) => {
        const allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        if (e) {
            callback(e);
        } else {
            callback(null, allPhones);
        }
    })
}

function readOne(phoneAge, callback) {
    fs.readFile(fileName, (e, d) => {
        const allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const singlePhone = allPhones.find((phone) => phone.age == phoneAge);
        if (e) {
            callback(e);
        } else {
            callback(null, singlePhone);
        }
    })
}

function saveOne(userToAdd, callback) {
    fs.readFile(fileName, (e, d) => {
        const allUsers = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allUsers.push(userToAdd);
        fs.writeFile(fileName, JSON.stringify(allUsers), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}

function updateOne(singlePhone, callback) {
    fs.readFile(fileName, (e, d) => {
        const allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allPhones.map((phone) => {
            if (phone.age.toString() == singlePhone.age.toString()) {
                phone.carrier = singlePhone.carrier;
                phone.id = singlePhone.id;
                phone.imageUrl = singlePhone.imageUrl;
                phone.name = singlePhone.name;
                phone.snippet = singlePhone.snippet;
            }
        })

        fs.writeFile(fileName, JSON.stringify(allPhones), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}

function deleteOne(phoneAge, callback) {
    fs.readFile(fileName, (e, d) => {
        let allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allPhones = allPhones.filter(phone => phone.age.toString() !== phoneAge.toString());
        fs.writeFile(fileName, JSON.stringify(allPhones), (e) => {
            if (e) {
                callback(e);
            } else {
                callback(null);
            }
        })
    });
}

const moudleDal = (fileName) => {
    return {
        readOne: readOne,
        readAll: readAll,
        saveOne: saveOne,
        deleteOne: deleteOne,
        updateOne: updateOne
    }
};
module.exports.moudleDal;

