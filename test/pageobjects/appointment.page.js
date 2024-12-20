const dynamicData = require("../support/dynamicData");
const Page = require("./page");

class AppointmentPage extends Page {
  get appointmentDate() {
    return $('[id="appointments_consulate_appointment_date"]');
  }

  get noAvailableDateError() {
    return $('[id="consulate_date_time_not_available"] small')
  }

  get calendar() {
    return $('[id="ui-datepicker-div"] tbody tr');
  }

  get activeDate() {
    return $$('[data-handler="selectDay"]');
  }

  get calendarsNextIcon() {
    return $('[class="ui-icon ui-icon-circle-triangle-e"]');
  }

  async checkCalendar() {
    let appointmentField = await this.appointmentDate;
    await browser.pause(500);
    await appointmentField.click();
    let appointmentDate;
    let newArr = [];
    for (let i = 0; i <= 120; i++) {
      let date = await this.activeDate;
      if (date.length !== 0) {
        for (let j = 0; j < date.length; j++) {
          let m = await date[j].getAttribute("data-month");
          let n = parseInt(m);
          let a = n + 1;
          let month = a.toString();
          let year = await date[j].getAttribute("data-year");
          let dayText = await date[j].$("a");
          let day = await dayText.getText();
          appointmentDate = day + "-" + month + "-" + year;
          newArr.push(appointmentDate);
        }
      }
      await (await this.calendarsNextIcon).click();
      await browser.pause(200);
    }
    let dates = [...new Set(newArr)];
    return dates;
  }
}
module.exports = new AppointmentPage();
