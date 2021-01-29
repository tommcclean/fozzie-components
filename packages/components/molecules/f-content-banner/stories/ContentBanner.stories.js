// Uncomment the import below to add prop controls to your Story (and add `withKnobs` to the decorators array)
// import {
//     withKnobs, select, boolean
// } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import ContentBanner from '../src/components/ContentBanner.vue';

export default {
    title: 'Components/Molecules',
    decorators: [withA11y]
};

export const ContentBannerComponent = () => ({
    components: { ContentBanner },
    props: {
    },
    template: `<content-banner />`
});

ContentBannerComponent.storyName = 'f-content-banner';
