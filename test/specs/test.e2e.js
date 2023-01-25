const App = require("../pageobjects/application");
const helpers = require("../support/helpers");

describe("Appointment application", () => {
  beforeEach(async () => {
    await App.helpers.setDataForStartActionsArm();
    await App.loginPage.open();
  });

  it("Armenian user flow", async () => {
    await App.loginPage.login(
      App.staticData.systemUsernameArm,
      App.staticData.systemPasswordArm
    );
    await App.groupsPage.clickOnContinueBtn();
    await browser.pause(1000)
    let isUserValid = await App.actionPage.isRescheduleButtonDisplayed();
    if (isUserValid) {
      await App.actionPage.navigateToAppointmentSection();
      let noAvailableDateError = await App.appointmentPage.noAvailableDateError;
      await browser.pause(1000);
      let isDisplayed = await noAvailableDateError.isDisplayed();
      if (isDisplayed) {
        await App.helpers.setDataForFinalActionsFailure('Arm');
        if (App.dynamicData.shouldBeSent) {
          await App.mailSender.sendEmailAboutDateChange(App.staticData.recepients);
        }
      } else {
        App.dynamicData.newRunResults = await App.appointmentPage.checkCalendar();
        await App.helpers.setDataForFinalActionsSuccess('Arm');
        if (App.dynamicData.shouldBeSent) {
          await App.mailSender.sendEmailAboutDateChange(App.staticData.recepients);
        }
      }
    } else if (!isUserValid) {
      App.helpers.setDataForFinalActionsUserIssue('Arm');
      
      if (App.dynamicData.shouldBeSent) {
        await App.mailSender.sendEmailAboutDateChange(App.staticData.recepients);
      }
    }
    console.log(isUserValid);
    console.log(App.dynamicData.shouldBeSent);
  });
});
