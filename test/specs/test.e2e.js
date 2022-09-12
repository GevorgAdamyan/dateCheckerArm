const App = require("../pageobjects/application");

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
  });
});
