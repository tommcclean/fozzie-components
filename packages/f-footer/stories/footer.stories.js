import { select, boolean } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withTests } from '@storybook/addon-jest';
import VueFooter from '../src/components/Footer.vue';

import results from '../src/components/tests/.jest-test-results.json';

export default {
    title: 'Components/Fozzie/Organisms',
    decorators: [withA11y, withTests({ results })],
    parameters: {
        a11y: {
            element: '.c-footer', // root element
            config: {},
            options: {
                rules: {
                    'duplicate-id': { enabled: false }
                }
            }
        }
    }
};

export const FooterComponent = () => ({
    components: { VueFooter },
    props: {
        locale: {
            default: select('Locale', ['en-GB', 'en-AU'])
        },
        showCourierLinks: {
            default: boolean('Show courier links', true)
        }
    },
    template: '<vue-footer :showCourierLinks="showCourierLinks" :locale="locale" />'
});

FooterComponent.parameters = {
    jest: [
        'CountrySelector.test.js',
        'Footer.test.js',
        'LinkList.test.js'
    ]
};

FooterComponent.storyName = 'f-footer';
