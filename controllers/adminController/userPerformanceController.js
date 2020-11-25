var Service = require("../../services");
var UniversalFunctions = require("../../utils/universalFunctions");
var async = require("async");
// var UploadManager = require('../../lib/uploadManager');
var TokenManager = require("../../lib/tokenManager");
var CodeGenerator = require("../../lib/codeGenerator");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var _ = require("underscore");
var Config = require("../../config");
var ObjectId = require('mongoose').Types.ObjectId;

const verifyManager = (_id, callback) => {
  let returnObj = {
    success: true,
    data: []
  };
  const sendError = (error) => {
    returnObj.success = false;
    returnObj.data = error;
    return returnObj;
  }
  const sendSuccess = (data) => {
    returnObj.data = data;
    return returnObj;
  }
  Service.UserService.getUser({
    _id: _id,
    isBlocked: false,
    userType: Config.APP_CONSTANTS.DATABASE.USER_ROLES.MANAGER
  }, {}, {}, (err, data) => {
    if (err) callback(sendError(err));
    else {
      if (data.length === 0) callback(sendError(ERROR.INCORRECT_ACCESSTOKEN))
      else {
        callback(sendSuccess((data && data[0]) || null));
      }
    }
  });
}

/**
 * 
 * @param {Function} cb 
 * @param {any} err 
 */
const genericCallback = (cb, err) => {
  if (err) {
    cb(err)
    return false
  } return true
}

const verifyOwnerAndSuperAdmin = (_id, callback) => {
  let returnObj = {
    success: true,
    data: []
  };
  const sendError = (error) => {
    returnObj.success = false;
    returnObj.data = error;
    return returnObj;
  }
  const sendSuccess = (data) => {
    returnObj.data = data;
    return returnObj;
  }
  Service.UserService.getUser({
    _id: _id,
    isBlocked: false
  }, {}, {}, (err, data) => {
    if (err) callback(sendError(err));
    else {
      if (data.length === 0) callback(sendError(ERROR.INCORRECT_ACCESSTOKEN))
      else if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER)
        cb(ERROR.PRIVILEGE_MISMATCH);
      else {
        callback(sendSuccess((data && data[0]) || null));
      }
    }
  });
}

/**
 * @author Sanchit Dang
 * 
 * @param {Object} payload Payload
 * @param {Object} payload.user User Auth Object
 * @param {Object} payload.data Payload Data
 * @param {String} payload.data.valueId Value to for performance
 * @param {String} payload.data.userId UserId
 * @param {Number} payload.data.rating Rating Min: 0, Max: 10
 * @param {String} payload.data.comment Comments for rating
 * @param {Function} callback Callback Function
 */
const createUserPerformanceRecord = (payload, callback) => {
  const manager = payload.user;
  const dataToSave = UniversalFunctions.cleanObject(payload.data);
  console.log(dataToSave)
  let result;
  async.series([
    (cb) => {
      verifyManager(manager._id, (response) => {
        if (response.success) cb();
        else cb(response.data);
      });
    },
    (cb) => {
      if (ObjectId.isValid(payload.data.userId) && ObjectId.isValid(payload.data.valueId)) {
        cb();
      }
      else cb(ERROR.DEFAULT);
    },
    (cb) => {
      Service.UserService.getUser({
        _id: dataToSave.userId,
        isBlocked: false,
      }, {}, {}, (err, data) => {
        if (genericCallback(cb, err)) {
          if (data.length === 0) cb(ERROR.USER_NOT_FOUND)
          else cb();
        }
      });
    },
    (cb) => {
      Service.CompanyValueService.getCompanyValue({ _id: dataToSave.valueId }, {}, {}, (err, data) => {
        if (genericCallback(cb, err)) {
          if (data.length === 0) cb(ERROR.INVALID_COMPANY_VALUE_ID)
          else cb();
        }
      })
    },
    (cb) => {
      Service.UserPerformanceService.createRecord(dataToSave, (err, data) => {
        if (genericCallback(cb, err)) {
          result = data;
          cb();
        }
      });
    }
  ],
    (err, data) => {
      if (err) callback(err);
      else callback(null, result);
    }
  );
};


/**
 * @author Sanchit Dang
 * 
 * @param {Object} payload Payload
 * @param {Object} payload.user User Auth Object
 * @param {Object} payload.data Payload Data
 * @param {String} payload.data.valueId Value to for performance
 * @param {String} payload.data.userId UserId
 * @param {Function} callback Callback Function
 */
const getAllRecords = (payload, callback) => {
  const manager = payload.user;
  const dataToSave = UniversalFunctions.cleanObject(payload.data);
  let result;
  async.series([
    (cb) => {
      verifyManager(manager._id, (response) => {
        if (response.success) cb();
        else cb(response.data);
      });
    },
    (cb) => {
      Service.UserService.getUser({
        _id: dataToSave.userId,
        isBlocked: false,
      }, {}, {}, (err, data) => {
        if (genericCallback(cb, err)) {
          if (data.length === 0) cb(ERROR.USER_NOT_FOUND)
          else cb();
        }
      });
    },
    (cb) => {
      Service.CompanyValueService.getCompanyValue({ _id: dataToSave.valueId }, {}, {}, (err, data) => {
        if (genericCallback(cb, err)) {
          if (data.length === 0) cb(ERROR.INVALID_COMPANY_VALUE_ID)
          else cb();
        }
      })
    },
    (cb) => {
      Service.UserPerformanceService.getRecords({ valueId: dataToSave.valueId, userId: dataToSave.userId }, {}, {}, (err, data) => {
        if (genericCallback(cb, err)) {
          result = data;
          cb();
        }
      });
    }
  ],
    (err, data) => {
      if (err) callback(err);
      else callback(null, result);
    }
  );
};




module.exports = {
  createUserPerformanceRecord: createUserPerformanceRecord,
  getAllRecords: getAllRecords
}