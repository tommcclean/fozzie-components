const Page = require('@justeat/f-wdio-utils/src/page.object')

class Button extends Page {

    get component () { return $('[data-test-id="action-button-component"]') }

    open(){
        super.openComponent('atom', 'button-component');
    }

    waitForComponent(){
        this.component.waitForExist();
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }
}

module.exports = Button;
