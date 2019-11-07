const fs = require('fs');

const fileName = './phones/phones.json';

function readOne(age, callback) {
    fs.readFile(fileName, (e, d) => {
        const allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        const onePhone = allPhones.find((phone) => phone.age == age);
        console.log(onePhone);
        if (e) {
            callback(e);
        } else {
            callback(null, onePhone);
        }
    })
}

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

function saveOne(phone, callback) {
    fs.readFile(fileName, (e, d) => {
        const phonesArray = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        phonesArray.push(phone);
        fs.writeFile(fileName, JSON.stringify(phonesArray), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null);
            }
        });
    });
}

function updateOne(phone, callback) {
    fs.readFile(fileName, (e, d) => {
        const allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allPhones.map((phoneElement)=>{
            if(phoneElement.age === phone.age){
                phoneElement.id = phone.id;
                phoneElement.carrier = phone.carrier;
                phoneElement.imageUrl = phone.imageUrl;
                phoneElement.name = phone.name;
                phoneElement.snippet = phone.snippet;
            }
        })

        fs.writeFile(fileName, JSON.stringify(allPhones), (e) => {
            if (e) {
                callback('error');
            }
            else {
                callback(null, allPhones);
            }
        });
    });
}

function deleteOne(phone, callback) {
    fs.readFile(fileName, (e, d) => {
        let allPhones = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        allPhones = allPhones.filter(r => r.id !== phone);

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