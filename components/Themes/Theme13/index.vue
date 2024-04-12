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


for (let i in props.apiData.filter.features) {
    let feature = props.apiData.filter.features[i]
    if (formData.value.features[feature.id] == undefined) {
        formData.value.features[feature.id] = []
    }
}


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
const isMenuActive = ref(false)
function openMenu() {
    isMenuActive.value = !isMenuActive.value
}
</script>

<script>
export default {
    props: {
        content: {},
        apiData: {},
    },
    emits: ["update:apiData"],
};


</script>

<template>
 <section class="shop-start-part">
        <div class="container">
            <div class="main-part">
                <div class="row justify-content-between">
                    <div class="filter-btn">
                        <button @click="openMenu" type="button" class="btn-secondary open-filter">{{ translate('Filter') }}</button>
                    </div>
                    <div :class="`col-lg-2 col-md-3 col-sm-4 col-12 mob-d-none mob-filter-open ${isMenuActive == true ? 'opened' : ''}`">
                        <div class="shop-filter">
                            <form>
                                <ul class="margin-bottom-ul">
                                    <li>
                                        <h5 class="shop-start-title">{{ translate('By Category') }}</h5>
                                        <ul>
                                            <li class="category" v-for="category in apiData.categories">

                                                <nuxt-link :to="`/${category.url}`" class="filter-title toggled">
                                                    {{ category.name }}
                                                </nuxt-link>
                                                <div class="filter-content">
                                                    <ul>
                                                        <li v-for="subcategory in category.categories"
                                                            :class="`${subcategory.active ? 'active' : ''}`" class="subcategory">
                                                            <nuxt-link :to="`/${subcategory.url}`" class="">{{subcategory.name }}</nuxt-link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul class="margin-bottom-ul">
                                    <li>
                                        <h5 class="shop-start-title">{{ translate('Sort by') }}</h5>
                                        <ul>
                                            <li class="category checkbox" v-for="sorting in apiData.sorting">
                                                <div class="filter-checkbox check-your-info-sort">
                                                    <input :id="`sorting_${sorting.key}`" type="radio"
                                                    class="category-filter" :value="sorting.key" :name="`sorting_${sorting.id}`" 
                                                    v-model="formData.order_by" @change="filter">
                                                    <label :for="`sorting_${sorting.key}`">
                                                        {{ sorting.name }}
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul v-for="feature in apiData.filter.features" class="margin-bottom-ul">
                                    <li>
                                        <h5 class="shop-start-title">{{ feature.name }}</h5>
                                        <ul v-if="feature.type == 'color'" class="choose-color-part">
                                            <li v-for="list in feature.list">
                                                <div class="filter-checkbox check-your-info-color">
                                                    <label :for="`list_${list.id}`">
                                                        <input :id="`list_${list.id}`" :name="`feature_${feature.id}`" type="checkbox" 
                                                        class="category-filter" :value="list.id" @change="filter" v-model="formData.features[feature.id]" >
                                                        <div class="bg-color" :style="`background-color:${list.color}`">
                                                        </div>
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                        <ul class="size-part" v-if="feature.type == 'checkbox'">
                                            <li v-for="list in feature.list">
                                                <div class="filter-checkbox">
                                                    <input :id="`list_${list.id}`" :name="`feature_${feature.id}`" type="checkbox"
                                                        class="category-filter" :value="list.id" @change="filter" v-model="formData.features[feature.id]">
                                                    <label :for="`list_${list.id}`">
                                                        <span>
                                                            {{ list.name }}
                                                        </span>
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul class="margin-bottom-ul">
                                    <li>
                                        <h5 class="shop-start-title">{{ translate('By price') }}</h5>
                                        <div class="d-flex  price-range align-items-center">
                                            <input class="range-input min" type="number" min="10" max="21000"
                                                placeholder="$" v-model="formData.price_min">
                                            -
                                            <input class="range-input max" type="number" min="10" max="21000"
                                                placeholder="$" v-model="formData.price_max">
                                            <button type="button" class="btn-go" @click="filter">{{ translate('Go')
                                                }}</button>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-10 col-md-9 col-sm-8 col-12">
                        <div class="row product">
                            <div v-if="apiData.products.length == 0" class="empty-product-shop">
                                <div class="empty-image-part">
                                    <img src="/images/empty.svg" class="" width="" height="">
                                </div>
                            </div>
                            <div v-for="product in apiData.products" class="col-lg-3 col-md-6 col-sm-6 col-6 mb-3">
                                <Product :product="product"></Product>
                            </div>
                        </div>
                        <div id="products_pagination" class="w-100 d-flex justify-content-center">
                            <Pagination :page="apiData.page" :total="apiData.total"
                                :prevIcon="`<i class='fa fa-chevron-left'></i>`"
                                :nextIcon="`<i class='fa fa-chevron-right'></i>`" @emitPagination="filter">
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
 </section> 
</template>
