import { select, text } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import {
    VALID_CHECKOUT_METHOD,
    CHECKOUT_METHOD_DELIVERY
} from '../src/constants';

import {
    VALID_LOCALES,
    ENGLISH_LOCALE
} from '../../storybook/constants/globalisation';

import VueCheckout from '../src/components/Checkout.vue';
import CheckoutMock from '../src/demo/checkoutMock';

CheckoutMock.setup('/checkout.json');

export default {
    title: 'Components/Organisms',
    decorators: [withA11y],
    argTypes: {
        checkoutUrl: { control: { type: 'text' } }
    }
};

export const CheckoutComponent = () => ({
    components: { VueCheckout },
    props: {
        locale: {
            default: select('Locale', VALID_LOCALES, ENGLISH_LOCALE)
        },
        checkoutUrl: {
            default: text('Checkout URL', '/checkout.json')
        }
    },
    template:
        '<vue-checkout :locale="locale" :checkout-url="checkoutUrl" />'
});

CheckoutComponent.storyName = 'f-checkout';
