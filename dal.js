const fs = require('fs');

const fileName = './phones/phones.json';

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

function saveOne(phoneToAdd, callback) {
    fs.readFile(fileName, (e, d) => {
        const allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allPhones.push(phoneToAdd);
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

function updateOne(singlePhone, callback) {
    fs.readFile(fileName, (e, d) => {
        const allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allPhones.map((phone) => {
            if (phone.age.toString() == singlePhone.age.toString()) {
                phone.carrier = singlePhone.carrier;
                phone.id = singlePhone.id;
                phone.imageUrl = singlePhone.imageUrl;
                phone.name = singlePhone.name;
                phone.snippet =singlePhone.snippet;
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

module.exports.readOne = readOne;
module.exports.readAll = readAll;
module.exports.saveOne = saveOne;
module.exports.deleteOne = deleteOne;
module.exports.updateOne = updateOne;


/*
const b = [{a:1}, {a:2},{a:3},{a:4}];
age = 3;
const ageFound = b.find((element) => element.a === age); */