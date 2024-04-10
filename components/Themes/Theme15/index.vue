<script setup>

const { $generateRandomString, $sendApi, $getImage, $clearFilter } = useNuxtApp()


const globalData = inject('globalData')
const translate = inject('translate')
const addToCart = inject('addToCart')
const changeWishlist = inject('changeWishlist')


const route = useRoute()
const router = useRouter()


const props = defineProps({
    content: ref(),
    apiData: ref(),
})


const emit = defineEmits(['update:apiData']);
const formData = ref({
    page: 1,
    search: route.query.search != undefined ? route.query.search : "",
    order_by: route.query.order_by != undefined ? route.query.order_by : "",
    features: (route.query.features != undefined && route.query.features != "") ? JSON.parse(route.query.features) : {},
    price_min: route.query.price_min != undefined ? route.query.price_min : "",
    price_max: route.query.price_max != undefined ? route.query.price_max : "",


})

async function loadData() {
    let newApiData = await $sendApi(`/api/products`, formData.value)
    emit('update:apiData', newApiData);
}


function filter(name = '', value = '') {
    if (name != "") {
        formData.value[name] = value
    }
    router.push({
        query: $clearFilter(formData.value),
    });
}


watch(() => route.query, () => {
    formData.value.page = route.query.page ? route.query.page : 1;
    formData.value.search = route.query.search ? route.query.search : "";
    loadData()
})

</script>

<script>

export default {
    props: {
        product: {},
    }
};

</script>

<template>
    <section class="recomended-part-start">
        <div class="container">
            <div class="main-part">
                <h2 class="recomended-part-title">{{ content.title }}</h2>
                <div class="row product">
                    <div class="col-lg-3 col-md-4 col-6 mb-3" v-for="product in apiData.products">
                        <Product :product="product"></Product>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
