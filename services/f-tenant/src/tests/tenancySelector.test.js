import TenancySelector from '../index';

describe('Tenancy Selector', () => {
    const EXPECTED_ACTION_NAME = 'globalisation/select';

    let context = {};
    let selectedTenant = null;
    let selectedLocale = null;
    let actionDispatched = null;

    const mockSetTenantAction = (actionToDispatch, { tenant, locale }) => {
        actionDispatched = actionToDispatch;
        selectedTenant = tenant;
        selectedLocale = locale;
    };

    beforeEach(() => {
        process.server = true;
        process.client = false;
        selectedTenant = null;
        selectedLocale = null;
        actionDispatched = null;

        context = {
            app: {
                $cookies: {
                    get: jest.fn()
                }
            },
            req: {
                headers: {
                    host: ''
                }
            },
            store: {
                state: {
                    globalisation: {
                        tenant: null
                    }
                },
                dispatch: mockSetTenantAction
            },
            $logger: {
                logError: jest.fn(),
                logWarn: jest.fn(),
                logInfo: jest.fn()
            }
        };
    });

    it('should set tenant to NZ when url begins with NZ (Step 1)', () => {
        // ARRANGE
        context.req.headers.host = 'nz-magikarp-cwa.com';

        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe('nz');
        expect(selectedLocale).toBe('en-NZ');
        expect(actionDispatched).toBe(EXPECTED_ACTION_NAME);
    });

    it('should set tenant to AU when url ends with AU (Step 1)', () => {
        // ARRANGE
        context.req.headers.host = 'all-magikarp-cwa.com.au';

        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe('au');
        expect(selectedLocale).toBe('en-AU');
        expect(actionDispatched).toBe(EXPECTED_ACTION_NAME);
    });

    it('should set tenant to NZ when request header is NZ (Step 2)', () => {
        // ARRANGE
        context.req.headers['accept-tenant'] = 'nz';

        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe('nz');
        expect(selectedLocale).toBe('en-NZ');
        expect(actionDispatched).toBe(EXPECTED_ACTION_NAME);
    });

    it('should not set an invalid tenant when request header specifies one (Step 2)', () => {
        // ARRANGE
        context.req.headers['accept-tenant'] = 'zh';

        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe('uk');
        expect(selectedLocale).toBe('en-GB');
        expect(actionDispatched).toBe(EXPECTED_ACTION_NAME);
    });

    it('should set tenant to NZ when a cookie with NZ exists (Step 3)', () => {
        // ARRANGE
        context.app.$cookies.get.mockImplementation(() => 'nz');

        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe('nz');
        expect(selectedLocale).toBe('en-NZ');
        expect(actionDispatched).toBe(EXPECTED_ACTION_NAME);
    });

    it('should not be able to set an invalid tenant when cookie specifies one (Step 3)', () => {
        // ARRANGE
        context.app.$cookies.get.mockImplementation(() => 'zh');

        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe('uk');
        expect(selectedLocale).toBe('en-GB');
        expect(actionDispatched).toBe(EXPECTED_ACTION_NAME);
    });

    it('should use the default value when no other step matches a tenant (Step 4)', () => {
        // ARRANGE
        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe('uk');
        expect(selectedLocale).toBe('en-GB');
        expect(actionDispatched).toBe(EXPECTED_ACTION_NAME);
    });

    it('should not set a tenant when running client side', () => {
        // ARRANGE
        process.server = false;
        process.client = true;

        // ACT
        TenancySelector(context);

        // ASSERT
        expect(selectedTenant).toBe(null);
        expect(selectedLocale).toBe(null);
        expect(actionDispatched).toBe(null);
    });
});
