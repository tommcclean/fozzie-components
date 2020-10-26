<template>
    <a
        data-test-id="allergen-phone-link"
        :href="`tel:0123456789`"
        @handleClick="onPhoneClick">0123456789</a>
</template>

<script>
// import { mapState } from 'vuex';

export default {
    // computed: mapState('restaurantInfo', [
    //     'allergenPhoneNumber'
    // ]),

    methods: {
        onPhoneClick (e) {
            this.$emit('handleClick', e);
        }
    }
};
</script>
