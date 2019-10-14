var UniversalFunctions = require("../../utils/universalFunctions");
var Controller = require("../../controllers");
var Joi = require("joi");
var Config = require("../../config");

var createShout = {
  method: "PUT",
  path: "/api/admin/shout",
  handler: function (request, h) {
    var userData =
      (request.auth &&
        request.auth.credentials &&
        request.auth.credentials.userData) ||
      null;
    return new Promise((resolve, reject) => {
      Controller.ShoutBaseController.createShout(userData, request.payload, function (err, data) {
        if (!err) {
          resolve(UniversalFunctions.sendSuccess(null, data));
        } else {
          reject(UniversalFunctions.sendError(err));
        }
      });
    });
  },
  config: {
    description: "Shout to team",
    tags: ["api", "admin"],
    auth: "UserAuth",
    validate: {
      headers: UniversalFunctions.authorizationHeaderObj,
      failAction: UniversalFunctions.failActionFunction,
      payload: {
        teamSkip: Joi.boolean().required(),
        teamId: Joi.string().required(),
        userId: Joi.array().when('teamSkip', { is: true, then: Joi.array().required(), otherwise: Joi.array().optional().allow("") }),
        message: Joi.string().required(),
        credits: Joi.number().required(),
        values: Joi.array().required(),
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



var getShoutTransaction = {
  method: "POST",
  path: "/api/shout/getShoutTransaction",
  handler: function (request, h) {
    return new Promise((resolve, reject) => {
      Controller.ShoutBaseController.getShoutTransaction(request.payload, function (err, data) {
        if (!err) {
          resolve(UniversalFunctions.sendSuccess(null, data));
        } else {
          reject(UniversalFunctions.sendError(err));
        }
      });
    });
  },
  config: {
    description: "get shout transactions",
    tags: ["api", "admin"],
    validate: {
      payload: {
        transactionId: Joi.string().required()
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


var redeemTransaction = {
  method: "POST",
  path: "/api/shout/redeemTransaction",
  handler: function (request, h) {
    return new Promise((resolve, reject) => {
      Controller.ShoutBaseController.redeemTransaction(request.payload, function (err, data) {
        if (!err) {
          resolve(UniversalFunctions.sendSuccess(null, data));
        } else {
          reject(UniversalFunctions.sendError(err));
        }
      });
    });
  },
  config: {
    description: "Redeem transaction",
    tags: ["api", "user"],
    validate: {
      payload: {
        transactionId: Joi.string().required(),
        amount: Joi.number().required(),
        merchantId: Joi.string().required(),
        orderItem: Joi.string()
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

var getMerchantToShout = {
  method: "POST",
  path: "/api/shout/getMerchantToShout",
  handler: function (request, h) {
    return new Promise((resolve, reject) => {
      Controller.ShoutBaseController.getMerchantToShout(request.payload, function (err, data) {
        if (!err) {
          resolve(UniversalFunctions.sendSuccess(null, data));
        } else {
          reject(UniversalFunctions.sendError(err));
        }
      });
    });
  },
  config: {
    description: "get Merchant To Shout",
    tags: ["api", "admin"],
    validate: {
      payload: {
        merchantId: Joi.string().required()
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

var shoutBaseRoute = [
  createShout,
  getShoutTransaction,
  redeemTransaction,
  getMerchantToShout
];
module.exports = shoutBaseRoute;