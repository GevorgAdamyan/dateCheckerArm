class Application {
  loginPage = require("../pageobjects/login.page");
  groupsPage = require("../pageobjects/groups.page");
  actionPage = require("../pageobjects/actions.page");
  appointmentPage = require("../pageobjects/appointment.page");
  mailSender = require("../support/mailSender");
  excelEditor = require("../support/excelEditor");
  helpers = require("../support/helpers");
  dynamicData = require("../support/dynamicData");
  staticData = require("../support/staticData");
  utils = require("../support/utils");
}

module.exports = new Application();
