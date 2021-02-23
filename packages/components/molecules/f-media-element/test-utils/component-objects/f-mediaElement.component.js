const Page = require('@justeat/f-wdio-utils/src/page.object');

class MediaElement extends Page {

    get component () { return $('[data-test-id="mediaElement-component"]'); }

    open(){
        super.openComponent('molecule', 'media-element-component');
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }

    isComponentDisplayed(){
        return this.component.isDisplayed();
    }
}

module.exports = MediaElement;