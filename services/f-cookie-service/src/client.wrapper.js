/* eslint-disable implicit-arrow-linebreak */

import CookieUtility from 'js-cookie';

const clientWrapper = {
    delete: cookieName => {
        CookieUtility.remove(cookieName);
    },

    getCookie: cookieName =>
        CookieUtility.get(cookieName),

    set: (cookieName, cookieValue, expiresInDays = 31) => {
        CookieUtility.set(cookieName, cookieValue, { expires: expiresInDays });
    }
};

export default clientWrapper;
