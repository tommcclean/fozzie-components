const Page = require('@justeat/f-wdio-utils/src/page.object');

class Breadcrumbs extends Page {

    get component () { return $('[data-test-id="breadcrumbs-component"]') }

    open(){
        super.openComponent('molecule', 'breadcrumbs-component');
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }
}

module.exports = Breadcrumbs;
