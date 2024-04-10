<script setup>

const isLoading = ref(false);
const updateCart = inject('updateCart');

const props = defineProps({
    count: ref(),
    product: {},
})

const emit = defineEmits(['update:count']);

function validateCount(value) {

    let step = Number(props.product.cart_step);

    if (step > 1 && value != value.toFixed(0)) {
        value = value.toFixed(0);
    }

    if (value < 0) {
        value = Math.abs(value);
        value = value >= step ? value : step;
    }

    if (value % step != 0 && step > 1) {
        value = (value / step).toFixed(0) * step;
    }

    if (step != step.toFixed(0) && value != value.toFixed(1)) {
        value = value.toFixed(1);
    }

    if (step == 1 && value != value.toFixed(0)) {
        value = value.toFixed(0);
    }

    return Number(value);

}

function countChange(count) {
    isLoading.value = true
    count = validateCount(count)
    updateCart(props.product, count)
    props.count = count
    emit('update:count', count)
    isLoading.value = false
}

function plusCart() {
    let new_count = Number(props.count) + props.product.cart_step
    countChange(new_count)
}

function minusCart() {
    let new_count = Number(props.count) - props.product.cart_step
    countChange(new_count)
}

</script>
<script>
export default {
    props: {
        count: Number,
        product: {},
    },
    emits: ["update:count"],
};

</script>

<template>
    <div class="d-flex align-items-center buttons product-count-adding">
        <button :disabled="isLoading" @click="minusCart" class="btn" type="button">
            <img src="/images/minus.svg" alt="minus">
        </button>
        <input :disabled="isLoading" :value="count" v-on:change="countChange(Number($event.target.value))" :data-product-id="`${product.id}`" type="number" class="form-control buttons-text-part number_cart_product_product number_cart_product">
        <button :disabled="isLoading" @click="plusCart" class="btn" type="button">
            <img src="/images/plus.svg" alt="plus">
        </button>
    </div>
</template>