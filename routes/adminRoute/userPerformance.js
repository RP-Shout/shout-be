const UniversalFunctions = require("../../utils/universalFunctions");
const Controller = require("../../controllers");
const Joi = require("joi");

const createUserPerformanceRecord = {
  method: "POST",
  path: "/api/manager/rateUserPerformance",
  options: {
    description: "Rate User Performance",
    tags: ["api", "manager"],
    auth: "UserAuth",
    validate: {
      headers: UniversalFunctions.authorizationHeaderObj,
      payload: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(0).max(10).required(),
        valueId: Joi.string().required(),
        userId: Joi.string().required()
      }),
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  },
  handler: (request) => {
    const payload = {
      user: (request.auth &&
        request.auth.credentials &&
        request.auth.credentials.userData) ||
        null,
      data: request.payload
    }
    return new Promise((resolve, reject) => {
      Controller.UserPerformanceController.createUserPerformanceRecord(payload, (err, data) => {
        if (!err) resolve(UniversalFunctions.sendSuccess(null, data));
        else reject(UniversalFunctions.sendError(err));
      });
    });
  }
};

const getUserPerformaceRecords = {
  method: "GET",
  path: "/api/manager/getUserPerformance/{userId}/value/{valueId}",
  options: {
    description: "Rate User Performance",
    tags: ["api", "manager"],
    auth: "UserAuth",
    validate: {
      headers: UniversalFunctions.authorizationHeaderObj,
      params: Joi.object({
        valueId: Joi.string().required(),
        userId: Joi.string().required()
      }),
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  },
  handler: (request) => {
    const payload = {
      user: (request.auth &&
        request.auth.credentials &&
        request.auth.credentials.userData) ||
        null,
      data: request.params
    }
    return new Promise((resolve, reject) => {
      Controller.UserPerformanceController.getAllRecords(payload, (err, data) => {
        if (!err) resolve(UniversalFunctions.sendSuccess(null, data));
        else reject(UniversalFunctions.sendError(err));
      });
    });
  }
};

module.exports = [
  createUserPerformanceRecord,
  getUserPerformaceRecords
]