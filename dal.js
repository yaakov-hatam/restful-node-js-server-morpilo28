const fs = require('fs');
const fileName = 'C:\\Workspace - git\\restful-node-js-server-morpilo28\\phones\\phones.json';
/*C:\Workspace - git\restful-node-js-server-morpilo28\phones\phones.json */

function readOne(id, callback) {

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

function updateOne(runnerToUpdate, callback) {

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

module.exports.readAll = readAll;
module.exports.saveOne = saveOne;
module.exports.deleteOne = deleteOne;

