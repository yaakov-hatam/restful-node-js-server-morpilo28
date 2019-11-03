const dal = require('./dal');

function phone(id, callback) {
    callback(null, { "id": id, "name": "abc", "km": 42 });
    
    dal.readAll(id, function (runnerData) {

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

function createRunner(addedRunner, callback) {
    if (typeof addedRunner.id !== 'number') {
        callback('Runner id should be string');
    } else {
        dal.saveOne(addedRunner, (e) => {
            if (e) {
                callback(e);
            } else {
                callback(null);
            }
        })
    }
}

function updateRunner(runner) {

}

function deleteRunner(runnerToDelete, callback) {
    dal.deleteOne(runnerToDelete, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function filterRunnersList(selectedFiltersValues, callback) {
    dal.readAll((e, allRunners) => {
        let newArr = [];
        for (let i = 0; i < allRunners.length; i++) {
            if (allRunners[i].id == selectedFiltersValues.id) {
                newArr.push(allRunners[i]);
            } else if (allRunners[i].name == selectedFiltersValues.name) {
                newArr.push(allRunners[i]);
            } else if (allRunners[i].km == selectedFiltersValues.km) {
                newArr.push(allRunners[i]);
            }
        }
        if (e) {
            callback(e);
        } else {
            callback(null, newArr);
        }
    })
}
module.exports.updateRunner = function () {

}
module.exports.getRunner = phone;
module.exports.getPhones = getPhones;
module.exports.createRunner = createRunner;
module.exports.filterRunnersList = filterRunnersList;
module.exports.deleteRunner = deleteRunner;
