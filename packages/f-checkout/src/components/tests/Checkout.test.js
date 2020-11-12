import { shallowMount, createLocalVue } from '@vue/test-utils';
import { VueI18n } from '@justeat/f-globalisation';
import VueCheckout from '../Checkout.vue';
import tenantConfigs from '../../tenants';

const localVue = createLocalVue();

localVue.use(VueI18n);

const i18n = {
    locale: 'en-GB',
    messages: tenantConfigs['en-GB']
};

describe('Checkout', () => {
    allure.feature('Checkout');

    const checkoutUrl = '/checkout/uk/12345';

    let propsData;

    beforeEach(() => {
        propsData = { checkoutUrl };
    });

    it('should be defined', () => {
        const wrapper = shallowMount(VueCheckout, {
            i18n,
            localVue,
            propsData
        });

        expect(wrapper.exists()).toBe(true);
    });

    describe('computed ::', () => {
        const data = { customer: { firstName: 'name' } };

        describe('name ::', () => {
            it('should capitalize `firstName` data', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    i18n,
                    localVue,
                    propsData
                });

                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Act
                wrapper.setData(data);
                await wrapper.vm.$nextTick();

                // Assert
                expect(name.props('cardHeading')).toContain('Name');
            });
        });

        describe('title ::', () => {
            it('should add `name` to title text', async () => {
                // Arrange
                const wrapper = shallowMount(VueCheckout, {
                    i18n,
                    localVue,
                    propsData
                });

                const name = wrapper.find("[data-test-id='checkout-card-component']");

                // Act
                wrapper.setData(data);
                await wrapper.vm.$nextTick();

                // Assert
                expect(name.props('cardHeading')).toEqual('Name, confirm your details');
            });
        });
    });
});
