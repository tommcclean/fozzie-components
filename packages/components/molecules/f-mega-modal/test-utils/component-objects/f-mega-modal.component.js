const Page = require('@justeat/f-wdio-utils/src/page.object');

class MegaModal extends Page {

    get component () { return $('[data-test-id="mega-modal-component"]'); }

    open(){
        super.openComponent('molecule', 'mega-modal-component');
    }

    waitForComponent(){
        super.waitForComponent(this.component);
    }
}

module.exports = MegaModal;