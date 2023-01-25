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

  get rescheduleBtn() {
    return $('//*[text()="Հարցազրույցի համար վերստին պայմանավորվածություն ձեռք բերել"]')
  }

  async isRescheduleButtonDisplayed() {
    let btn = await this.rescheduleBtn;
    return btn.isDisplayed();
  }

  async navigateToAppointmentSection() {
    let item = await this.rescheduleAppointment;
    await browser.pause(500);
    await item.click();
    let btn = await this.rescheduleAppointmentBtn;
    await browser.pause(500);
    await btn.click();
  }
}
module.exports = new ActionPage();
