export default {
    async createAccount ($http, url, tenant, data) {
        const headers = {
            'Accept-Tenant': tenant
        };

        return $http.post(url, data, headers);
    }
};
