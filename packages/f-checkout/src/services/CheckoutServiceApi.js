import axios from 'axios';

export default {
    async getData (url, tenant, data, timeout) {
        const config = {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout
        };
        return axios
            .get(url, data, config);
    },

    async submitCheckout (url, tenant, data, timeout) {
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Tenant': tenant
            },
            timeout
        };
        return axios
            .post(url, data, config);
    }
};
