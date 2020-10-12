var UniversalFunctions = require("../../utils/universalFunctions");
var Controller = require("../../controllers");
var Joi = require("joi");
var Config = require("../../config");

var topUpBalance = {
    method: "PUT",
    path: "/api/topUp/topUpAdmin",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      return new Promise((resolve, reject) => {
        Controller.TopUpBaseController.topUpAdmin(userData, request.payload, function(err, data) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    options: {
      description: "Top up admin balance",
      tags: ["api", "admin"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
        payload : {
            amount : Joi.number().required()
        }
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  };


  var getTopUpTransactions = {
    method: "GET",
    path: "/api/topUp/getTopUpTransactions",
    handler: function(request, h) {
      var userData =
        (request.auth &&
          request.auth.credentials &&
          request.auth.credentials.userData) ||
        null;
      return new Promise((resolve, reject) => {
        Controller.TopUpBaseController.getTopUpTransaction(userData, function(err, data) {
          if (!err) {
            resolve(UniversalFunctions.sendSuccess(null, data));
          } else {
            reject(UniversalFunctions.sendError(err));
          }
        });
      });
    },
    options: {
      description: "Top up admin balance",
      tags: ["api", "admin"],
      auth: "UserAuth",
      validate: {
        headers: UniversalFunctions.authorizationHeaderObj,
        failAction: UniversalFunctions.failActionFunction,
      },
      plugins: {
        "hapi-swagger": {
          responseMessages:
            UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
        }
      }
    }
  };
  var TopUpBaseRoute = [
      topUpBalance,
      getTopUpTransactions
  ];
  module.exports = TopUpBaseRoute;