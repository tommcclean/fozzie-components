import { storiesOf } from '@storybook/vue';
import MegaModal from '../src/components/MegaModal.vue';

storiesOf('Components', module)
  .add('f-mega-modal', () => ({
    components: { MegaModal },
    template: `<mega-modal />`
  })
);
