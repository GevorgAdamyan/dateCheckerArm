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
    await appointmentField.waitForDisplayed()
    await appointmentField.click();
    let appointmentDate;
    let newArr = [];
    for (let i = 0; i <= 120; i++) {
      let date = await this.activeDate;
      if (date.length !== 0) {
        for (let j = 0; j < date.length; j++) {
          let month = await date[j].getAttribute("data-month");
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
    dynamicData.result = dates;
    dynamicData.mailSubject = "New appointment date";
    dynamicData.mailContent = `Appointment dates has been changed!!!\n
            Info: \n
            Start Time: ${dynamicData.startTime}\n
            End Time: ${dynamicData.endTime}\n
               Available dates: ${dynamicData.result}`;
    return dates;
  }
}
module.exports = new AppointmentPage();
