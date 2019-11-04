const dal = require('./dal');

function getPhone(id, callback) {
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

function createPhone(phone, callback) {
    dal.saveOne(phone, (e) => {
        if (e) {
            callback(e);
        } else {
            callback(null);
        }
    })
}

function updateRunner(runner) {

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

module.exports.getPhone = getPhone;
module.exports.getPhones = getPhones;
module.exports.createPhone = createPhone;
module.exports.filterRunnersList = filterRunnersList;
module.exports.deletePhone = deletePhone;