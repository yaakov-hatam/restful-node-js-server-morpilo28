const fs = require('fs');
const fileName = 'c:\\worksapce\\restful-node-js-server-morpilo28\\phones\\phones.json';
/* C:\worksapce\restful-node-js-server-morpilo28\phones\phones.json */

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

function saveOne(addedRunner, callback) {
    fs.readFile(fileName, (e, d) => {
        const runnersArray = d && d.length > 0 ? JSON.parse(d.toString()) : [];
        runnersArray.push(addedRunner);
        fs.writeFile(fileName, JSON.stringify(runnersArray), (e) => {
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

function deleteOne(runnerToDelete, callback) {
    fs.readFile(fileName, (e, d) => {
        let allRunners = d && d.length > 0 ? JSON.parse(d.toString()) : [];

        allRunners = allRunners.filter(r => r.id !== runnerToDelete);

        fs.writeFile(fileName, JSON.stringify(allRunners), (e) => {
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

