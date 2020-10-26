<template>
    <a
        :href="allergenUrl"
        data-test-id="allergen-url-link"
        target="_blank"
        rel="noopener"
        @handleClick="onUrlClick">https://localhost/</a>
</template>

<script>
// import { mapState } from 'vuex';

export default {
    // computed: mapState('restaurantInfo', [
    //     'allergenUrl'
    // ]),

    methods: {
        onUrlClick (e) {
            this.$emit('handleClick', e);
        }
    }
};
</script>
