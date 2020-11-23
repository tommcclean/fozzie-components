// import expect from 'expect';
import HeaderComponent from '../../../test-utils/component-objects/f-header.component';

describe('f-header component tests', () => {
    it('should display the f-header component', () => {
        // Assert
        expect(HeaderComponent.isLogoDisplayed()).toBe(true);
    });

    it('should display the navigation', () => {
         // Assert
         expect(HeaderComponent.isNavContainerDisplayed()).toBe(true);
    })
});
