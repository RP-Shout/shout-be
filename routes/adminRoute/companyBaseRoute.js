var UniversalFunctions = require("../../utils/universalFunctions");
var Controller = require("../../controllers");
var Joi = require("joi");
var Config = require("../../config");

// var createCompany = {
//     method: "POST",
//     path: "/api/admin/createCompany",
//     handler: function (request, h) {
//         var userData =
//             (request.auth &&
//                 request.auth.credentials &&
//                 request.auth.credentials.userData) ||
//             null;
//         var payloadData = request.payload;
//         return new Promise((resolve, reject) => {
//             Controller.CompanyBaseController.createCompany(
//                 userData,
//                 payloadData,
//                 function (err, data) {
//                     if (!err) {
//                         resolve(UniversalFunctions.sendSuccess(null, data));
//                     } else {
//                         reject(UniversalFunctions.sendError(err));
//                     }
//                 }
//             );
//         });
//     },
//     options: {
//         description: "create company",
//         tags: ["api", "admin"],
//         auth: "UserAuth",
//         validate: {
//             headers: UniversalFunctions.authorizationHeaderObj,
//             payload: {
//                 companyName: Joi.string().required(),
//                 companyLogo: Joi.string().required(),
//                 location: Joi.string().required(),
//                 businessPhoneNumber: Joi.string().regex(/^[0-9]{10}$/).trim().min(2).required(),
//                 contactEmail: Joi.string().required(),
//                 companyDescription: Joi.string().required(),
//                 values: Joi.array().required()
//             },
//             failAction: UniversalFunctions.failActionFunction
//         },
//         plugins: {
//             "hapi-swagger": {
//                 responseMessages:
//                     UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
//             }
//         }
//     }
// };


var updateCompany = {
    method: "PUT",
    path: "/api/admin/updateCompany",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.updateCompany(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "update company",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: Joi.object({
                companyName: Joi.string().optional().allow(''),
                companyLogo: Joi.string().optional().allow(''),
                location: Joi.string().optional().allow(''),
                businessPhoneNumber: Joi.string().regex(/^[0-9]{10}$/).trim().min(2).optional().allow(''),
                contactEmail: Joi.string().optional().allow(''),
                companyDescription: Joi.string().optional().allow(''),
            }),
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};


var addValuesToCompany = {
    method: "PUT",
    path: "/api/admin/addValuesToCompany",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.addValuesToCompany(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "add Values To Company",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required()
            }),
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var editValuesOfCompany = {
    method: "PUT",
    path: "/api/admin/company/{companyId}/value/{valueId}",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        const payload = {
            admin: userData,
            data: request.payload,
            valueId: request.params.valueId,
            companyId: request.params.companyId,
        }
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.updateCompanyValue(
                payload,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "edit Value of Company",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: Joi.object({
                name: Joi.string().optional().allow(),
                description: Joi.string().optional().allow()
            }),
            params: Joi.object({
                valueId: Joi.string().required(),
                companyId: Joi.string().required()
            }),
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var removeValueFromCompany = {
    method: "DELETE",
    path: "/api/admin/removeValueFromCompany",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.removeValueFromCompany(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "remove Value From Company",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: Joi.object({
                valuesId: Joi.string().required(),
            }),
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};


var getCompany = {
    method: "GET",
    path: "/api/admin/getCompany",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.getCompany(
                userData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "get company details",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var updateCompanyVision = {
    method: "PUT",
    path: "/api/admin/updateCompanyVision",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.updateCompanyVision(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "update company vision",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: Joi.object({
                companyDescription: Joi.string().required(),
            }),
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var updateCompanyTeamsConfig = {
    method: "PUT",
    path: "/api/admin/updateCompanyTeamsConfig",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        var payloadData = request.payload;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.updateCompanyTeamsConfig(
                userData,
                payloadData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "update company teams' config",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            payload: Joi.object({
                teamsConfig: Joi.object({
                    attentionSpan: Joi.number().required(),
                    recognitionSpan: Joi.number().required(),
                    recognition: Joi.number().required(),
                }).required(),
            }),
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var getCompanyForManager = {
    method: "GET",
    path: "/api/manager/getCompanyForManager",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.getCompanyForManager(
                userData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "get company details",
        tags: ["api", "user"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var getCompanies = {
    method: "GET",
    path: "/api/owner/getCompanies",
    handler: function (request, h) {
        var userData =
            (request.auth &&
                request.auth.credentials &&
                request.auth.credentials.userData) ||
            null;
        return new Promise((resolve, reject) => {
            Controller.CompanyBaseController.getCompanies(
                userData,
                function (err, data) {
                    if (!err) {
                        resolve(UniversalFunctions.sendSuccess(null, data));
                    } else {
                        reject(UniversalFunctions.sendError(err));
                    }
                }
            );
        });
    },
    options: {
        description: "get companies details",
        tags: ["api", "admin"],
        auth: "UserAuth",
        validate: {
            headers: UniversalFunctions.authorizationHeaderObj,
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            "hapi-swagger": {
                responseMessages:
                    UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};
module.exports = [
    //createCompany,
    updateCompany,
    getCompany,
    addValuesToCompany,
    editValuesOfCompany,
    removeValueFromCompany,
    updateCompanyVision,
    getCompanyForManager,
    getCompanies,
    updateCompanyTeamsConfig
]