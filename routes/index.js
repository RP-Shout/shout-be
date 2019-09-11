/**
 * Created by Navit
 */
"use strict";

var DemoBaseRoute = require("./demoRoute/demoBaseRoute");
var UserBaseRoute = require("./userRoute/userBaseRoute");
var AdminBaseRoute = require("./adminRoute/adminBaseRoute");
var TopUpBaseRoute = require("./topUpRoute/topUpBaseRoute");
var shoutBaseRoute = require('./shoutRoute/shoutBaseRoute');
var companyBaseRoute = require('./adminRoute/companyBaseRoute')
var APIs = [].concat(DemoBaseRoute, UserBaseRoute, AdminBaseRoute,TopUpBaseRoute,shoutBaseRoute,companyBaseRoute);
module.exports = APIs;
