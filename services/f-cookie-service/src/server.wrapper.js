/* eslint-disable implicit-arrow-linebreak */

import CookieUtility from 'js-cookie';

const serverWrapper = {
    delete: cookieName => {
        console.log(cookieName);
    },

    getCookie: cookieName =>
        CookieUtility.get(cookieName),

    set: (cookieName, cookieValue, maxAge) => {
        console.log({
            cookieName,
            cookieValue,
            maxAge
        });
    }
};

export default serverWrapper;
