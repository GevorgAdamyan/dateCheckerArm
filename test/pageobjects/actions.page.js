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

  async isRescheduleButtonDisplayed() {
    let btn = await this.rescheduleAppointment;
    let txt = await btn.getText();
    if(txt === 'Հարցազրույցի համար վերստին պայմանավորվածություն ձեռք բերել') {
      return true;
    } else {
      return false;
    }
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
