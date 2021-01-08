import { createServer, Model } from 'miragejs';
import cardFactory from './factories/cardFactory';
import cardSeed from './seeds/cardSeed';
import setupSeed from './seeds/setupSeed';

const data = () => {
    const now = Math.floor(Date.now() / 1000);

    /* eslint-disable camelcase */
    return {
        triggers: [],
        config: {
            time: now,
            attributes_blacklist: [
                'control_details',
                'contrpl_log',
                'currency',
                'delivery_method',
                'exclusions',
                'order_count',
                'order_id_local',
                'order_key',
                'payment_method_type',
                'platform',
                'postcode',
                'price',
                'product_id',
                'purchase_count_yesterday',
                'restaurant_name',
                'time',
                'voucher_code',
                'voucher_redeemed'
            ],
            events_blacklist: ['order_page'],
            purchases_blacklist: ['Chinese', 'Curry'],
            messaging_session_timeout: 21600,
            vapid_public_key: 'FOOBARBAZ',
            content_cards: {
                enabled: true
            }
        }
    };
    /* eslint-enable camelcase */
};

// eslint-disable-next-line import/prefer-default-export
export const makeServer = type => createServer({
    routes () {
        this.post('https://sdk.iad-01.braze.com/api/v3/data/', () => data());
        this.post('https://sdk.iad-01.braze.com/api/v3/content_cards/sync', schema => schema.cards.all());
        this.passthrough();
    },
    models: {
        card: Model
    },
    factories: {
        card: cardFactory
    },
    seeds (server) {
        switch (type) {
            case 'setupSeed':
                setupSeed(server);
                break;
            default:
                cardSeed(server);
        }
    }
});

export function resetBrazeData () {
    document.cookie
        .split('; ')
        .filter(row => row.startsWith('ab.'))
        .map(row => row.split('=')[0])
        .forEach(cookieName => {
            document.cookie = `${cookieName}=;max-age=0`;
        });

    Object.keys(localStorage)
        .filter(row => row.startsWith('ab.'))
        .forEach(storageItem => {
            localStorage.removeItem(storageItem);
        });
}
