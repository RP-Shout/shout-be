'use strict';

const Models = require('../models');

//Insert company in DB
const createCompanyValue = function (objToSave, callback) {
    new Models.CompanyValues(objToSave).save(callback)
};

//Get Company from DB
const getCompanyValue = function (criteria, projection, options, callback) {
    options.lean = true;
    Models.CompanyValues.find(criteria, projection, options, callback);
};

const getCompanyValuePopulated = (criteria, projection, populate, callback) => {
    options.lean = true;
    Models.CompanyValues.find(criteria).select(projection).populate(populate).exec(callback);
}

//Update Company in DB
const updateCompanyValue = function (criteria, dataToSet, options, callback) {
    options.lean = true;
    options.new = true;
    Models.CompanyValues.findOneAndUpdate(criteria, dataToSet, options, callback);
};



module.exports = {
    updateCompanyValue: updateCompanyValue,
    createCompanyValue: createCompanyValue,
    getCompanyValue: getCompanyValue,
    getCompanyValuePopulated: getCompanyValuePopulated
};