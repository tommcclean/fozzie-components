import {
    TENANT_UK,
    TENANT_AU,
    TENANT_NZ
} from './constants';

export default tenant => {
    switch (tenant) {
        case TENANT_UK: return 'en-GB';
        case TENANT_AU: return 'en-AU';
        case TENANT_NZ: return 'en-NZ';
        default: return 'en-GB';
    }
};
