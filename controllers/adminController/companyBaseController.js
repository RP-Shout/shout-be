var Service = require("../../services");
var UniversalFunctions = require("../../utils/universalFunctions");
var async = require("async");
var TokenManager = require("../../lib/tokenManager");
var CodeGenerator = require("../../lib/codeGenerator");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var _ = require("underscore");
var Config = require("../../config");
const { create } = require("../../models/user");



var updateCompany = function (userData, payloadData, callback) {
  var companyDetails;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.CompanyService.getCompany({ superAdminId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      },

      function (cb) {
        var dataToUpdate = {
          $set:
          {
            companyName: payloadData.companyName,
            companyLogo: payloadData.companyLogo,
            location: payloadData.location,
            businessPhoneNumber: payloadData.businessPhoneNumber,
            contactEmail: payloadData.contactEmail,
            companyDescription: payloadData.companyDescription,
          }
        };
        var condition = {
          superAdminId: userFound._id,
          _id: companyDetails._id
        };
        Service.CompanyService.updateCompany(condition, dataToUpdate, {}, function (err, data) {
          if (err) cb(err)
          else {
            companyDetails = data
            console.log(data[0])
            cb();
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};


var addValuesToCompany = function (userData, payloadData, callback) {
  var companyDetails;
  let createdValue;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.CompanyService.getCompany({ superAdminId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      },
      (cb) => {
        Service.CompanyValueService.createCompanyValue({
          companyId: companyDetails._id,
          name: payloadData.name,
          description: payloadData.description,
        }, (err, data) => {
          if (err) cb(err);
          else {
            createdValue = data._id;
            cb();
          }
        });
      },
      function (cb) {
        var dataToUpdate = {
          $addToSet: {
            values: createdValue
          }
        };
        var condition = {
          superAdminId: userFound._id,
          _id: companyDetails._id
        };
        Service.CompanyService.updateCompany(condition, dataToUpdate, {}, function (err, data) {
          if (err) cb(err)
          else {
            companyDetails = data
            cb();
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};

const updateCompanyValue = (payload, callback) => {
  const admin = payload.admin;
  const valueId = payload.valueId;
  const companyId = payload.companyId;
  const updatedData = UniversalFunctions.cleanObject(payload.data);
  let userFound;
  let newData;
  async.series([
    (cb) => {
      //verify admin
      Service.AdminService.getAdmin({
        _id: admin._id
      }, { password: 0 }, {}, function (err, data) {
        if (err) cb(err);
        else {
          if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
          else {
            userFound = (data && data[0]) || null;
            if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
            else cb();
          }
        }
      });
    },
    (cb) => {
      //verify company
      Service.CompanyService.getCompany({ superAdminId: userFound._id }, {}, {}, function (err, data) {
        if (err) cb(err)
        else {
          if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
          else {
            companyDetails = data && data[0] || null
            cb()
          }
        }
      })
    },
    (cb) => {
      //verify company value
      Service.CompanyValueService.getCompanyValue({
        _id: valueId,
        isActive: true
      }, {}, {}, function (err, data) {
        if (err) cb(err)
        else {
          if (data.length == 0) cb(ERROR.INVALID_COMPANY_VALUE_ID)
          else {
            companyDetails = data && data[0] || null
            cb()
          }
        }
      })
    },
    (cb) => {
      //update value details
      Service.CompanyValueService.updateCompanyValue({
        _id: valueId,
        companyId: companyId,
        isActive: true
      }, updatedData, {}, (err, data) => {
        if (err) cb(err);
        else {
          newData = data;
          cb();
        }
      });
    }], (err, data) => {
      if (err) return callback(err);
      else return callback(null, newData);
    }
  );

}


var editValuesOfCompany = function (userData, payloadData, callback) {
  var companyDetails;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.CompanyService.getCompany({ superAdminId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      },

      function (cb) {

        var dataToUpdate = {
          $set: {
            "values.$.name": payloadData.name,
            "values.$.description": payloadData.description
          }
        };
        var condition = {
          superAdminId: userFound._id,
          _id: companyDetails._id,
          values: {
            $elemMatch: {
              _id: payloadData.valuesId
            }
          }
        };
        Service.CompanyService.updateCompany(condition, dataToUpdate, {}, function (err, data) {
          if (err) cb(err)
          else {
            companyDetails = data
            cb();
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};

var removeValueFromCompany = function (userData, payloadData, callback) {
  var companyDetails;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.CompanyService.getCompany({ superAdminId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      },
      (cb) => {
        Service.CompanyValueService.updateCompanyValue({ _id: payloadData.valuesId }, { isActive: false }, {}, (err, data) => {
          if (err) cb(err);
          else cb();
        })
      },
      function (cb) {
        Service.CompanyService.getCompanyPopulated({ superAdminId: userFound._id }, {}, {
          path: 'values',
          select: '_id name description',
          match: {
            isActive: true
          },
          options: {
            lean: true
          }
        }, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};

var updateCompanyVision = function (userData, payloadData, callback) {
  var companyDetails;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.CompanyService.getCompany({ superAdminId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      },

      function (cb) {

        var dataToUpdate = {
          $set: {
            companyDescription: payloadData.companyDescription,
          }
        };
        var condition = {
          superAdminId: userFound._id,
          _id: companyDetails._id,
        };
        Service.CompanyService.updateCompany(condition, dataToUpdate, {}, function (err, data) {
          if (err) cb(err)
          else {
            companyDetails = data
            cb();
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};

var updateCompanyTeamsConfig = function (userData, payloadData, callback) {
  var companyDetails;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.CompanyService.getCompany({ superAdminId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      },

      function (cb) {

        var dataToUpdate = {
          $set: {
            teamsConfig: payloadData.teamsConfig,
          }
        };
        var condition = {
          superAdminId: userFound._id,
          _id: companyDetails._id,
        };
        Service.CompanyService.updateCompany(condition, dataToUpdate, {}, function (err, data) {
          if (err) cb(err)
          else {
            companyDetails = data
            cb();
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};


var getCompany = function (userData, callback) {
  var companyDetails;
  var userDetails = false;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              cb();
            }
          }
        });
      },

      function (cb) {
        Service.AdminService.getAdminExtended({ adminId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            userDetails = data && data[0] || null;
            cb();
          }
        })
      },
      function (cb) {
        if (userDetails == false) cb(ERROR.USER_NOT_FOUND);
        else if (userDetails == null) cb(ERROR.INVALID_USERTYPE)
        else Service.CompanyService.getCompanyPopulated({ _id: userDetails.companyId }, {}, {
          path: 'values',
          match: {
            isActive: true
          },
          select: 'isActive _id name description',
          options: {
            lean: true
          }
        }, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        });
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};

var getCompanyForManager = function (userData, callback) {
  var companyDetails;
  var userDetails;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id
        };
        Service.UserService.getUser(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (data.length == 0) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.MANAGER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },
      function (cb) {
        Service.UserService.getUserExtended({ userId: userFound._id }, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            userDetails = data && data[0] || null;
            cb();
          }
        })
      },
      function (cb) {
        Service.CompanyService.getCompanyPopulated({ _id: userDetails.companyId }, {}, {
          path: 'values',
          match: {
            isActive: true
          },
          select: 'isActive _id name description',
          options: {
            lean: true
          }
        }, function (err, data) {
          if (err) cb(err)
          else {
            if (data.length == 0) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data && data[0] || null
              cb()
            }
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};

var getCompanies = function (userData, callback) {
  var companyDetails;
  var userDetails;
  async.series(
    [
      function (cb) {
        var criteria = {
          _id: userData._id,
          userType: Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER
        };
        Service.AdminService.getAdmin(criteria, { password: 0 }, {}, function (err, data) {
          if (err) cb(err);
          else {
            if (!data) cb(ERROR.INCORRECT_ACCESSTOKEN);
            else {
              userFound = (data && data[0]) || null;
              if (userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.SUPERADMIN && userFound.userType != Config.APP_CONSTANTS.DATABASE.USER_ROLES.OWNER) cb(ERROR.PRIVILEGE_MISMATCH);
              else cb();
            }
          }
        });
      },

      function (cb) {
        var select = 'fullName emailId firstLogin'
        var path = "superAdminId";
        var populate = {
          path: path,
          match: {},
          select: select,
          options: {
            lean: true
          }
        };
        var projection = {
          __v: 0,
        };
        Service.CompanyService.getPopulatedCompanyDetails({}, projection, populate, {}, {}, function (err, data) {
          if (err) cb(err)
          else {
            if (!data) cb(ERROR.INVALID_COMPANY_ID)
            else {
              companyDetails = data
              cb()
            }
          }
        })
      }
    ],
    function (err, result) {
      if (err) return callback(err);
      else return callback(null, { companyDetails });
    }
  );
};


module.exports = {
  // createCompany: createCompany,
  updateCompany: updateCompany,
  getCompany: getCompany,
  addValuesToCompany: addValuesToCompany,
  editValuesOfCompany: editValuesOfCompany,
  removeValueFromCompany: removeValueFromCompany,
  updateCompanyVision: updateCompanyVision,
  getCompanyForManager: getCompanyForManager,
  getCompanies: getCompanies,
  updateCompanyTeamsConfig: updateCompanyTeamsConfig,
  updateCompanyValue: updateCompanyValue
}
