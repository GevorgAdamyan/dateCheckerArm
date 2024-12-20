const Page = require("./page");

class GroupsPage extends Page {

    get continueBtn() {
        return $('[class="button primary small"]')
    }

    async clickOnContinueBtn() {
        let btn = await this.continueBtn;
        await browser.pause(500);
        await btn.click();
    }
}
module.exports = new GroupsPage();
