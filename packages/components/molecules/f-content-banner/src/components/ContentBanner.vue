<template>
    <div
        :class="$style['c-contentBanner']"
        data-test-id="contentBanner">
        I am a ContentBanner Component (GB)
    </div>
</template>

<script>

export default {
    name: 'ContentBanner',
    components: {},
    props: {
    }
};
</script>

<style lang="scss" module>

.c-contentBanner {
    display: flex;
    justify-content: center;
    min-height: 80vh;
    width: 80vw;
    margin: auto;
    border: 1px solid $red;
    font-family: $font-family-base;
    @include font-size(heading-m);
}

</style>
