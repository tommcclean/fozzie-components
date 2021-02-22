const Page = require('@justeat/f-wdio-utils/src/page.object')

class Card extends Page {

    get component () { return $('[data-test-id="card-component"]') }

    open(){
        super.openComponent('atom', 'card-component');
    }

    waitForComponent(){
        this.component.waitForExist();
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }
}

module.exports = Card;
