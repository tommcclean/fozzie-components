const Page = require('@justeat/f-wdio-utils/src/page.object');

class SearchBox extends Page {

    get component () { return $('[data-test-id="searchbox-component"]'); }

    open(){
        super.openComponent('molecule', 'searchbox-component');
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        this.component.isDisplayed();
    }
}

module.exports = SearchBox;
