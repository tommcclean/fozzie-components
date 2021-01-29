import { shallowMount } from '@vue/test-utils';
import ContentBanner from '../ContentBanner.vue';

describe('ContentBanner', () => {
    it('should be defined', () => {
        const propsData = {};
        const wrapper = shallowMount(ContentBanner, { propsData });
        expect(wrapper.exists()).toBe(true);
    });
});
