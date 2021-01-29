const contentBannerComponent = () => $('[data-test-id="contentBanner"]');

exports.waitForContentBannerComponent = () => contentBannerComponent().waitForExist();

exports.isContentBannerComponentDisplayed = () => contentBannerComponent().isDisplayed();
