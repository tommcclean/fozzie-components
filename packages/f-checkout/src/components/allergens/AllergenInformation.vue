<template>
    <div>
        <button
            :class="[
                $style['o-btn--allergy'],
                'o-btnLink'
            ]"
            data-test-id="allergy-button"
            @click.prevent="showModal">
            <span
                class="u-showAboveMid"
                data-test-id="allergen-desktop-message">
                {{ copy.allergies.allergy }}
            </span>

            <span
                class="u-showBelowMid"
                data-test-id="allergen-mobile-message">
                {{ copy.allergies.allergyTap }}
            </span>
        </button>

        <mega-modal
            :is-open="shouldShowModal"
            has-overlay
            :has-close-button="false">
            <h3 class="u-noSpacing">
                {{ copy.allergies.allergenHeading }}
            </h3>

            <allergen-mc-donalds-content v-if="isMcDonalds" />

            <allergen-standard-content v-else />

            <button
                type="button"
                class="o-btn o-btn--primary o-btn--block o-btn--rounded"
                :class="$style['o-btn-close']"
                @click="onModalClose">
                {{ copy.allergies.allergenModalClose }}
            </button>
        </mega-modal>
    </div>
</template>

<script>
import { globalisationServices } from '@justeat/f-services';
import MegaModal from '@justeat/f-mega-modal';
import { mapState } from 'vuex';
import AllergenMcDonaldsContent from './AllergenMcDonaldsContent.vue';
import AllergenStandardContent from './AllergenStandardContent.vue';
import '@justeat/f-mega-modal/dist/f-mega-modal.css';
import tenantConfigs from '../../tenants';

export default {
    components: {
        MegaModal, AllergenMcDonaldsContent, AllergenStandardContent
    },
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
            theme,
            shouldShowModal: false
        };
    },
    computed: {
        ...mapState('checkout', [
            'isMcDonalds'
        ])
    },
    methods: {
        showModal () {
            this.shouldShowModal = true;
        },
        onModalClose () {
            // this.pushAllergensInteraction('click_close');
            this.shouldShowModal = false;
        },
        pushAllergensInteraction (/* label */) {
            // this.trackAllergensInteraction({ label, method: this.contactMethod });
        },
        onPhoneClick () {
            // this.pushAllergensInteraction('click_phone');
        },

        onUrlClick () {
            // this.pushAllergensInteraction('click_url');
        },

        onModalOpen () {
            // this.pushAllergensInteraction('view_dialog');
        }
    }
};
</script>

<style lang="scss" module>
    $line-height: 16px;

    button.o-btn--allergy {
        padding: 0 spacing(x3);
        @include font-size(body-l);
        font-weight: $font-weight-bold;
        line-height: $line-height;
        margin: spacing() 0;
    }

    button.o-btn-close {
        margin: 0 auto;
        max-width: 400px;
    }
</style>
