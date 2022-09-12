const Page = require('./page');

class LoginPage extends Page {

    get inputUsername() {
        return $('#user_email');
    }

    get inputPassword() {
        return $('#user_password');
    }

    get checkBox() {
        return $('[style="position: relative;"]')
    }

    get btnSubmit() {
        return $('input[type="submit"]');
    }

    async login(username, password) {
        let input = await this.inputUsername;
        await input.scrollIntoView();
        await input.setValue(username);
        await this.inputPassword.setValue(password);
        let box = await this.checkBox;
        await box.click();
        await this.btnSubmit.click();
    }

    open() {
        return super.open('hy-am/niv/users/sign_in');
    }
}

module.exports = new LoginPage();
