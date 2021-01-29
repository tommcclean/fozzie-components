import ContentBannerComponent from '../../../test-utils/component-objects/f-contentBanner.component';

describe('f-contentBanner component tests', () => {
    beforeEach(() => {
        browser.url('?path=/story/components-molecules--content-banner-component');
        browser.switchToFrame(0);
        ContentBannerComponent.waitForContentBannerComponent();
    });

    it('should display the f-contentBanner component', () => {
        // Assert
        expect(ContentBannerComponent.isContentBannerComponentDisplayed()).toBe(true);
    });
});
