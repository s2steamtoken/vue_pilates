<script setup lang="ts">
const props = defineProps({
    error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
    <div>
        <ThemesTheme25></ThemesTheme25>
    </div>
</template>
<style lang="scss">
    .title {
        font-size: 3rem;
        font-weight: bold;
        line-height: 1.2;
    }
</style>