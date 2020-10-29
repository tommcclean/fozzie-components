<template>
    <div
        :class="$style['c-allergenAlert-standardContent-wrapper']">
        <p
            v-if="
                hasPhoneNumberAndAllergenUrl">
            {{ copy.allergies.phoneNumberAndUrl }}

            <a
                data-test-id="allergen-phone-link"
                :href="`tel:${allergenPhoneNumber}`"
                @handleClick="onPhoneClick">{{ allergenPhoneNumber }}</a>

            <a
                :href="allergenUrl"
                data-test-id="allergen-url-link"
                target="_blank"
                rel="noopener"
                @handleClick="onUrlClick">{{ allergenUrl }}/</a>
        </p>

        <p v-else-if="hasPhoneNumberOnly">
            {{ copy.allergies.phoneNumberOnly }}

            <a
                data-test-id="allergen-phone-link"
                :href="`tel:${allergenPhoneNumber}`"
                @handleClick="onPhoneClick">{{ allergenPhoneNumber }}</a>
        </p>

        <p v-else-if="hasAllergenUrlOnly">
            {{ copy.allergies.urlOnly }}

            <a
                :href="allergenUrl"
                data-test-id="allergen-url-link"
                target="_blank"
                rel="noopener"
                @handleClick="onUrlClick">{{ allergenUrl }}/</a>
        </p>

        <p v-else>
            {{ copy.allergies.noPhoneNumberAndNoUrl }}
        </p>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import { mapState } from 'vuex';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import tenantConfigs from '../../tenants';

export default {
    components: { },
    props: {
        locale: {
            type: String,
            default: ''
        }
    },
    data () {
        const locale = globalisationServices.getLocale(tenantConfigs, this.locale, this.$i18n);
        const localeConfig = tenantConfigs[locale];
        const theme = globalisationServices.getTheme(locale);

        return {
            copy: { ...localeConfig },
            theme
        };
    },
    computed: {
        ...mapState('checkout', [
            'allergenPhoneNumber',
            'allergenUrl'
        ]),

        contactMethod () {
            const phone = this.allergenPhoneNumber ? 'phone' : 'nophone';
            const url = this.allergenUrl ? 'url' : 'nourl';

            return `${phone}_${url}`;
        },

        hasPhoneNumberAndAllergenUrl () {
            return this.contactMethod === 'phone_url';
        },

        hasPhoneNumberOnly () {
            return this.contactMethod === 'phone_nourl';
        },

        hasAllergenUrlOnly () {
            return this.contactMethod === 'nophone_url';
        }
    },
    methods: {
        /* TODO - Add tracking (separate ticket) */
        pushAllergensInteraction (/* label */) {
            // this.trackAllergensInteraction({ label, method: this.contactMethod });
        },

        onPhoneClick () {
            // this.pushAllergensInteraction('click_phone');
        },

        onUrlClick () {
            // this.pushAllergensInteraction('click_url');
        }
    }
};
</script>

<style lang="scss" module>
    $line-height: 16px;

    .c-allergenAlert-standardContent-wrapper {
        margin: spacing(x3) 0;
    }
</style>
