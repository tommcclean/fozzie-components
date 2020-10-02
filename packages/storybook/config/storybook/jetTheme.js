import { create } from '@storybook/theming/create';
import logo from '../../public/logo--pie.svg';

export default create({
    base: 'dark',

    colorPrimary: '#fff',
    colorSecondary: '#2a3846',

    // UI
    appBg: '#0c151d',
    appContentBg: '#1b252e',
    // appBorderColor: 'hotpink',
    // appBorderRadius: 4,

    // Typography
    fontBase: '"JustEatBasis", Arial, sans-serif',
    // fontCode: 'monospace',

    // Text colors
    textColor: '#fff',
    textInverseColor: 'hotpink',

    // Toolbar default and active colors
    barTextColor: '#fff',
    barSelectedColor: '#f36d00',
    barBg: '#1b252e',

    // Form colors
    // inputBg: '#f36d00',
    // inputBorder: 'transparent',
    // inputTextColor: '#fff',
    inputBg: '#fff',
    inputBorder: '#0c151d',
    inputTextColor: '#fff',
    inputBorderRadius: 2,

    brandTitle: 'Just Eat Takeaway',
    // brandUrl: 'https://pie.just-eat.com/',
    brandImage: logo
});
