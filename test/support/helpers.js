const excelEditor = require("../support/excelEditor");
const dynamicData = require("./dynamicData");
const staticData = require("./staticData");
const utils = require("./utils");

class Helpers {
  async setDataForStartActionsArm() {
    dynamicData.startTime = utils.getCurrentTime();
    let rowNum = await excelEditor.getLastLine('data/data.xlsx', 'Arm');
    let numberOfUsers = await excelEditor.getLastLine('data/credentials.xlsx', 'Sheet1');
    dynamicData.lastLoginIndex = +await excelEditor.readCellFromExcelFile('data/data.xlsx', 'Arm', `E${rowNum}`);
    console.log(dynamicData.lastLoginIndex);
    if (dynamicData.lastLoginIndex !== numberOfUsers) {
      dynamicData.newLoginIndex = dynamicData.lastLoginIndex + 1;
    }
    else {
      dynamicData.newLoginIndex = 2;
    }
    staticData.systemUsernameArm = await excelEditor.readCellFromExcelFile(
      "data/credentials.xlsx",
      'Sheet1',
      `A${dynamicData.newLoginIndex}`
    );
    staticData.systemPasswordArm = await excelEditor.readCellFromExcelFile(
      "data/credentials.xlsx",
      'Sheet1',
      `B${dynamicData.newLoginIndex}`
    );
    staticData.outlookUsername = await excelEditor.readCellFromExcelFile(
      "data/credentials.xlsx",
      'Sheet1',
      'C2'
    )
    staticData.recepients = await excelEditor.readColumnFromExcelFile(
      "data/recepients.xlsx",
      'Sheet1',
      1
    );
  }

  async compareLastTwoRuns() {
    return utils.compareArrays(dynamicData.newRunResults, dynamicData.lastRunResults)
  }

  async setDataForFinalActionsSuccess(sheetName) {
    dynamicData.endTime = utils.getCurrentTime();
    let rowNumber = await excelEditor.getLastLine('data/data.xlsx', sheetName);
    dynamicData.lastRunResults = await excelEditor.readCellFromExcelFileAsArray('data/data.xlsx', sheetName, 'B' + rowNumber);
    let areTheSame = await this.compareLastTwoRuns();
    dynamicData.shouldBeSent = !areTheSame;
    await this.createEmailBody(sheetName);
    let data = [dynamicData.startTime, dynamicData.newRunResults.toString(), 'Pass', !areTheSame, dynamicData.newLoginIndex];
    await this.clearAllData('data/data.xlsx', sheetName)
    await excelEditor.addRowToExcel('data/data.xlsx', sheetName, data)
  }

  async createEmailBody(nation) {
    dynamicData.mailSubject = `New appointment date (${nation})`;
    dynamicData.mailContent = `Appointment dates has been changed (${nation})!!!\n
                               Info: \n
                                  Start Time: ${dynamicData.startTime}\n
                                  End Time: ${dynamicData.endTime}\n
                                  Previous dates: ${dynamicData.lastRunResults}\n
                                  Available dates: ${dynamicData.newRunResults}`
  }

  async setDataForFinalActionsFailure(nation) {
    let rowNumber = await excelEditor.getLastLine('data/data.xlsx', nation);
    dynamicData.endTime = utils.getCurrentTime();
    dynamicData.mailSubject = `No appointment date (${nation})`;
    dynamicData.mailContent = `There are no available appointments (${nation})!!!\n
                               Info: \n
                                  Start Time: ${dynamicData.startTime}\n
                                  End Time: ${dynamicData.endTime}\n`
    dynamicData.lastRunResults = await excelEditor.readCellFromExcelFileAsArray('data/data.xlsx', nation, 'B' + rowNumber);
    let changed;
    if (dynamicData.lastRunResults.toString() === 'There are no available appointments') {
      changed = false;
      dynamicData.shouldBeSent = false;
    }
    else {
      changed = true;
      dynamicData.shouldBeSent = true;
    }
    let data = [dynamicData.startTime, 'There are no available appointments', 'Pass', changed, dynamicData.newLoginIndex];
    await this.clearAllData('data/data.xlsx', nation)
    await excelEditor.addRowToExcel('data/data.xlsx', nation, data)
  }

  async setDataForFinalActionsUserIssue(nation) {
    let rowNumber = await excelEditor.getLastLine('data/data.xlsx', nation);
    dynamicData.endTime = utils.getCurrentTime();
    dynamicData.mailSubject = `User issue (${nation})`;
    dynamicData.mailContent = `There following user has an issue. Please check it (${nation})!!!\n
                               Credentials: \n
                                  Username: ${staticData.systemUsernameArm}\n
                                  Password: ${staticData.systemPasswordArm}\n`
    let changed = false;
    dynamicData.shouldBeSent = true;
    let data = [dynamicData.startTime, 'User issue', 'Fail', changed, dynamicData.newLoginIndex];
    await this.clearAllData('data/data.xlsx', nation)
    await excelEditor.addRowToExcel('data/data.xlsx', nation, data)
  }

  async clearAllData(filePath, sheetName) {
    let now = new Date().toString();
    if (now.includes('Tue')) {
      await excelEditor.clearData(filePath, sheetName);
    }
  }
}

module.exports = new Helpers();
