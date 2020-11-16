import ClientWrapper from './client.wrapper';
import ServerWrapper from './server.wrapper';

const isServerSide = () => typeof (window) === 'undefined';

const cookieService = {
    delete: cookieName => (isServerSide
        ? ServerWrapper.getCookie(cookieName)
        : ClientWrapper.getCookie(cookieName)),

    get: (cookieName, defaultValue = null) => {
        const cookieValue = isServerSide
            ? ServerWrapper.getCookie(cookieName)
            : ClientWrapper.getCookie(cookieName);

        // Apply default value if required
        return (cookieValue === null && defaultValue)
            ? defaultValue
            : cookieValue;
    },

    set: (cookieName, cookieValue, expiresInDays) => {
        if (!cookieValue) {
            throw 'No cookie value provided';
        }

        (isServerSide
        ? ServerWrapper.getCookie(cookieName)
        : ClientWrapper.getCookie(cookieName, cookieValue, expiresInDays));
    };
};

export default cookieService;
