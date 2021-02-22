const Page = require('@justeat/f-wdio-utils/src/page.object')

class ErrorMessage extends Page {

    get component () { return $('[data-test-id="error-message-component"]') }

    open(){
        super.openComponent('atom', 'error-message-component');
    }

    waitForComponent(){
        this.component.waitForExist();
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }
}

module.exports = ErrorMessage;
