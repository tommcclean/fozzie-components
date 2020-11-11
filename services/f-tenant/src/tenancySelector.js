import {
    TENANT_UK,
    SUPPORTED_TENANTS
} from './constants';

import selectLocale from './localeSelector';

let _logger = null;
let _store = null;

const checkHostName = ({ host }) => {
    const startString = host.substring(0, 2);
    const endString = host.substring(host.length - 2);
    const matchedTenant = SUPPORTED_TENANTS.find(tenant => tenant === startString || tenant === endString);
    return matchedTenant;
};

const filterUnsupportedTenant = requestedTenant => {
    const result = SUPPORTED_TENANTS.find(tenant => tenant === requestedTenant);

    if (requestedTenant && !result) {
        _logger.logError(`Unsupported Tenant Attempted: ${requestedTenant}`, _store);
    }

    return result;
};

const checkAcceptTenantHeader = ({ headers }) => {
    const tenantHeader = headers['accept-tenant'];
    return filterUnsupportedTenant(tenantHeader);
};

const checkTenantCookie = ({ $cookies }) => {
    const tenantCookie = $cookies.get('je:tenant');
    return filterUnsupportedTenant(tenantCookie);
};

const tenancySelector = ({
    app,
    store,
    req,
    $logger
}) => {
    // Only run this process once, on the first request; which is always server side.
    try {
        console.log('Start', process.server);

        if (typeof (window) === 'undefined') {
            _logger = $logger;
            _store = store;

            const tenant =
                // STEP 1 - Check the start and end of the hostname for a tenant string
                checkHostName(req.headers) ||
                // STEP 2 - Check the 'accept-tenant' request header
                checkAcceptTenantHeader(req) ||
                // STEP 3 - Check a development machine cookie
                checkTenantCookie(app) ||
                // STEP 4 - Apply a default
                TENANT_UK;

            const locale = selectLocale(tenant);

            store.dispatch('globalisation/select', {
                tenant,
                locale
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export default tenancySelector;
