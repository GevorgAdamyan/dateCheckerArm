module.exports = class Page {
    open(path) {
        browser.maximizeWindow();
        return browser.url(`https://ais.usvisa-info.com/${path}`)
    }
}
