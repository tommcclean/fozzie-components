import httpModule from '@justeat/f-http';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

import Registration from '../Registration.vue';
import EventNames from '../../event-names';
import { CONSUMERS_REQUEST_DATA } from '../../../test/specs/constants/consumer';

const { mockFactory, httpVerbs } = httpModule;

const propsData = {
    locale: 'en-GB',
    createAccountUrl: 'http://localhost/consumer/uk',
    showLoginLink: true,
    loginUrl: '/account/register'
};

const setFormFieldValues = wrapper => {
    wrapper.find('[data-test-id="formfield-firstName-input"]').setValue(CONSUMERS_REQUEST_DATA.firstName);
    wrapper.find('[data-test-id="formfield-lastName-input"]').setValue(CONSUMERS_REQUEST_DATA.lastName);
    wrapper.find('[data-test-id="formfield-email-input"]').setValue(CONSUMERS_REQUEST_DATA.emailAddress);
    wrapper.find('[data-test-id="formfield-password-input"]').setValue(CONSUMERS_REQUEST_DATA.password);
    // TODO: Add marketing preferences checkbox when it exists
};

describe('Registration API service', () => {
    let div;

    beforeEach(() => {
        div = document.createElement('div');
        document.body.appendChild(div);
    });

    it('responds with 201 when request is made with valid details', async () => {
        // Arrange
        mockFactory.setupMockResponse(httpVerbs.POST, propsData.createAccountUrl, CONSUMERS_REQUEST_DATA, 201);

        const wrapper = mount(Registration, {
            mocks: {
                $http: mockFactory.createMockClient()
            },
            propsData,
            attachTo: div
        });

        setFormFieldValues(wrapper);

        // Act
        await wrapper.vm.onFormSubmit();
        await flushPromises();

        // Assert
        expect(wrapper.emitted(EventNames.CreateAccountSuccess).length).toBe(1);
    });

    it('responds with 409 when request is made with e-mail in use', async () => {
        // Arrange
        mockFactory.setupMockResponse(httpVerbs.POST, propsData.createAccountUrl, CONSUMERS_REQUEST_DATA, 409, {
            faultId: 'e2ea5f11-f771-487a-9f80-5c6f0981890b',
            traceId: '80000806-0000-fd00-b63f-84710c7967bb',
            errors: [
                {
                    description: 'The specified email already exists',
                    errorCode: '409'
                }
            ]
        });

        const wrapper = mount(Registration, {
            mocks: {
                $http: mockFactory.createMockClient()
            },
            propsData,
            attachTo: div
        });

        setFormFieldValues(wrapper);

        // Act
        await wrapper.vm.onFormSubmit();
        await flushPromises();

        // Assert
        expect(wrapper.emitted(EventNames.CreateAccountFailure).length).toBe(1);
        expect(wrapper.vm.shouldShowEmailAlreadyExistsError).toBe(true);
    });

    it('responds with 403 when login blocked by ravelin or recaptcha', async () => {
        // Arrange
        mockFactory.setupMockResponse(httpVerbs.POST, propsData.createAccountUrl, CONSUMERS_REQUEST_DATA, 403, {
            faultId: '25bbe062-c53d-4fbc-9d6c-3df6127b94fd',
            traceId: 'H3TKh4QSJUSwVBCBqEtkKw',
            errors: [
                {
                    description: 'Failed user authentication.',
                    errorCode: 'FailedUserAuthentication'
                }
            ]
        });

        const wrapper = mount(Registration, {
            mocks: {
                $http: mockFactory.createMockClient()
            },
            propsData,
            attachTo: div
        });

        setFormFieldValues(wrapper);

        // Act
        await wrapper.vm.onFormSubmit();
        await flushPromises();

        // Assert
        expect(wrapper.emitted(EventNames.LoginBlocked).length).toBe(1);
        expect(wrapper.emitted(EventNames.CreateAccountFailure)).toBeUndefined();
    });
});
