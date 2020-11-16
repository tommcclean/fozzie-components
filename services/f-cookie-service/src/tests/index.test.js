import CookieService from '../index';

describe('Cookie Service', () => {
    it('should export a service with expected methods', () => {
        // ARRANGE
        // ACT
        // ASSERT
        expect(CookieService).toBeDefined();
        expect(CookieService.delete).toBeDefined();
        expect(CookieService.get).toBeDefined();
        expect(CookieService.set).toBeDefined();
    });
});
