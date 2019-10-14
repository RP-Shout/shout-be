"use strict";
var Models = require("../models");

var updateMerchant = function (criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.Merchant.findOneAndUpdate(criteria, dataToSet, options, callback);
};

var updateMerchantExtended = function (criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.MerchantExtended.findOneAndUpdate(criteria, dataToSet, options, callback);
};

var updateMerchantClaims = function (criteria, dataToSet, options, callback) {
  options.lean = true;
  options.new = true;
  Models.MerchantClaims.findOneAndUpdate(criteria, dataToSet, options, callback);
};


var createMerchant = function (objToSave, callback) {
  new Models.Merchant(objToSave).save(callback);
};

var createMerchantExteded = function (objToSave, callback) {
  new Models.MerchantExtended(objToSave).save(callback);
}

var createMerchantOrder = function (objToSave, callback) {
  new Models.MerchantOrderHistory(objToSave).save(callback);
};

var createMerchantClaims = function (objToSave, callback) {
  new Models.MerchantClaims(objToSave).save(callback);
};

var deleteMerchant = function (criteria, callback) {
  Models.Merchant.findOneAndRemove(criteria, callback);
};


var getMerchant = function (criteria, projection, options, callback) {
  options.lean = true;
  Models.Merchant.find(criteria, projection, options, callback);
};


var getMerchantExtended = function (criteria, projection, options, callback) {
  options.lean = true;
  Models.MerchantExtended.find(criteria, projection, options, callback);
};

var getMerchantOrders = function (criteria, projection, options, callback) {
  options.lean = true;
  Models.MerchantOrderHistory.find(criteria, projection, options, callback).sort({ date: -1 });
};

var getMerchantClaims = function (criteria, projection, options, callback) {
  options.lean = true;
  Models.MerchantClaims.find(criteria, projection, options, callback).sort({ date: -1 });
};
var getMerchantPromise = function (criteria, projection, options) {
  options.lean = true;
  return new Promise((resolve, reject) => {
    Models.Merchant.find(criteria, projection, options, function (err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

module.exports = {
  updateMerchant: updateMerchant,
  createMerchant: createMerchant,
  deleteMerchant: deleteMerchant,
  getMerchant: getMerchant,
  getMerchantPromise: getMerchantPromise,
  createMerchantExteded: createMerchantExteded,
  getMerchantExtended: getMerchantExtended,
  updateMerchantExtended: updateMerchantExtended,
  createMerchantOrder: createMerchantOrder,
  getMerchantOrders: getMerchantOrders,
  createMerchantClaims: createMerchantClaims,
  getMerchantClaims: getMerchantClaims,
  updateMerchantClaims: updateMerchantClaims
};
