import { shallowMount } from '@vue/test-utils';
import MegaModal from '../MegaModal.vue';

describe('MegaModal', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(MegaModal, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
