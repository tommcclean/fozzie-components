import httpVerbs from '../httpVerbs';

describe('httpVerbs', () => {
    it('should be defined', async () => {
        // Arrange, Act & Assert
        expect(httpVerbs).toBeDefined();
    });

    it('should define expected properties with correct values', async () => {
        // Arrange, Act & Assert
        expect(httpVerbs.METHOD_GET).toBe('GET');
        expect(httpVerbs.METHOD_POST).toBe('POST');
        expect(httpVerbs.METHOD_PUT).toBe('PUT');
        expect(httpVerbs.METHOD_PATCH).toBe('PATCH');
        expect(httpVerbs.METHOD_DELETE).toBe('DELETE');
    });
});
