const Page = require("./page");

class ActionPage extends Page {
  get rescheduleAppointment() {
    return $('[id="forms"] ul li:nth-child(3)');
  }

  get rescheduleAppointmentBtn() {
    return $(
      '[id="forms"] ul li:nth-child(3) [class="button small primary small-only-expanded"]'
    );
  }

  async navigateToAppointmentSection() {
    let item = await this.rescheduleAppointment;
    await item.waitForDisplayed();
    await item.click();
    let btn = await this.rescheduleAppointmentBtn;
    await btn.waitForDisplayed();
    await btn.click();
  }
}
module.exports = new ActionPage();
