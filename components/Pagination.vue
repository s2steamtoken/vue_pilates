<script lang="ts">
export default {
    props: {
        total: {
            type: Number,
            required: false,
            default: 0,
        },
        page: {
            type: Number,
            required: false,
            default: 0,
        },
        nextIcon: {
            type: String,
            required: false,
            default: `<i class="fa fa-chevron-right"></i>`
        },
        prevIcon: {
            type: String,
            required: false,
            default: `<i class="fa fa-chevron-left"></i>`
        }
    },
};

</script>

<template>
    <ul v-if="total > 1" class="pagination">

        <li v-if="Number(page) - 1 > 0" class="page-item">
            <button v-html="prevIcon" href="javascript:;" class="page-link" @click="$emit('emitPagination', 'page', (page - 1))"></button>
        </li>

        <template v-for="i in 3">
            <li v-if="((page - (3 - i + 1))) > 0" class="page-item">
                <button href="javascript:;" class="page-link" @click="$emit('emitPagination', 'page', ((page - (3 - i + 1))))">{{ ((page - (3 - i + 1))) }}</button>
            </li>
        </template>

        <li class="page-item"><button class="page-link active">{{ Number(page) }}</button></li>

        <template v-for="i in 3">
            <li v-if="Number(page) + i <= total" class="page-item">
                <button href="javascript:;" class="page-link" @click="$emit('emitPagination', 'page', (Number(page) + i))">{{ (Number(page) + i) }}</button>
            </li>
        </template>

        <li v-if="Number(page) + 1 <= total" class="page-item">
            <button v-html="nextIcon" href="javascript:;" class="page-link" @click="$emit('emitPagination', 'page', (page + 1))"></button>
        </li>
        
    </ul>
</template>
