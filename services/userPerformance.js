'use strict';

const Models = require('../models');

//Insert company in DB
const createRecord = function (objToSave, callback) {
    new Models.UserPerformance(objToSave).save(callback)
};

//Get Company from DB
const getRecords = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.UserPerformance.find(criteria, projection, options, callback);
};

const getRecordsPopulated = (criteria, projection, populate, callback) => {
    Models.UserPerformance.find(criteria).select(projection).populate(populate).exec(callback);
}

//Update Company in DB
const updateRecord = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.UserPerformance.findOneAndUpdate(criteria, dataToSet, options, callback);
};

module.exports = {
    createRecord: createRecord,
    getRecords: getRecords,
    getRecordsPopulated: getRecordsPopulated,
    updateRecord: updateRecord
};