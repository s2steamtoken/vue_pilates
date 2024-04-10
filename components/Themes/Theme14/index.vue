<script setup>

const { $getImage, $sendApi } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const addToCart = inject('addToCart')
const changeWishlist = inject('changeWishlist')
const openModal = inject('openModal')

const router = useRouter()

const props = defineProps({
    content: ref(),
    apiData: ref(),
})

const product = props.apiData.product;

const features_selected = ref({});

// Set default features
if (props.apiData.product != undefined && product.features != undefined) {
    product.features.forEach((feature) => {

        features_selected.value[feature.id] = "";
        let feature_list = toRaw(feature.list);
        for (let i in feature_list) {
            let list = feature_list[i];
            if (list.default == 1) {
                features_selected.value[feature.id] = list.id
            }
        }
    });
}

async function featureChange() {

    let productApi = await $sendApi(`/api/products/getPrice`, {
        product_id: product.id,
        features: features_selected.value
    }
    );

    if (productApi.status == 200) {
        product.price = productApi.price
        product.old_price = productApi.old_price
    }

}

function productAddToCart(product, count) {
    addToCart(product, count, features_selected.value)
    // router.push({
    //     path: '/checkout',
    //     force: true,
    // });
    // // openModal('addtoCart')
}

</script>

<script>
export default {
    props: {
        content: {},
        apiData: {},
    },
};
</script>


<template>
    <section class="pillates-shop-single">
        <div class="container">
            <div class="main-part">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="row">
                            <div
                                :class="`col-lg-${product.other_images.length == 1 ? 12 : 6} col-md-${product.other_images.length == 1 ? 12 : 6} col-sm-${product.other_images.length == 0 ? 12 : 4} col-${product.other_images.length == 0 ? 12 : 6} single-part ${product.other_images.length == 1 ? 'height-part' : '' } `">
                                <nuxt-img :src="product.image" :width="product.other_images.length == 1 ? 629 : 305" :height="product.other_images.length == 1 ? 368 : 368" />
                                <div class="text-part">
                                    <h5 class="single-part-text">{{ translate('limited edition') }}</h5>
                                </div>
                            </div>
                            <div v-for="image in product.other_images"
                            :class="`col-lg-${product.other_images.length == 1 ? 12 : 6} col-md-${product.other_images.length == 1 ? 12 : 6} col-sm-${product.other_images.length == 0 ? 12 : 4} col-${product.other_images.length == 0 ? 12 : 6} single-part ${product.other_images.length == 1 ? 'height-part' : '' }`">
                                <nuxt-img :src="image" :width="product.other_images.length == 1 ? 629 : 305" :height="product.other_images.length == 1 ? 368 : 368" />
                                <div class="text-part">
                                    <h5 class="single-part-text">{{ translate('limited edition') }}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="d-flex justify-content-between">
                            <h4 class="pillates-shop-single-title"> {{ product.name }}</h4>
                            <p class="pillates-price"> {{ product.price }} {{ globalData.currency_title }}</p>
                        </div>
                        <!-- <div class="star-rating">
                            <div class="color-stars" style="width: 100%;">
                                <img width="16" height="16" src="/images/star.svg">
                                <img width="16" height="16" src="/images/star.svg">
                                <img width="16" height="16" src="/images/star.svg">
                                <img width="16" height="16" src="/images/star.svg">
                                <img width="16" height="16" src="/images/star.svg">
                            </div>
                            <div class="d-flex">
                                <img width="16" height="16" src="/images/starempty.svg">
                                <img width="16" height="16" src="/images/starempty.svg">
                                <img width="16" height="16" src="/images/starempty.svg">
                                <img width="16" height="16" src="/images/starempty.svg">
                                <img width="16" height="16" src="/images/starempty.svg">
                            </div>
                        </div> -->
                        <div class="d-flex justify-content-between align-items-center mb-product-part">
                            <template v-for="feature in product.features">
                                <h5 v-if="feature.type == 'color'" class="color-title-part">
                                    {{ translate('In ${color} colors').replace('${color}', feature.list.length) }}
                                </h5>
                            </template>
                            <button @click="changeWishlist(product)" :class="product.in_wishlist ? 'active' : ''"
                                class="add-to-wishlist ">
                                <nuxt-img width="18" height="18" src="/images/heart.svg" alt="" class="heart"></nuxt-img>
                                <nuxt-img width="18" height="18" src="/images/whiteheart.svg" alt="" class="white-heart"></nuxt-img>
                            </button>
                        </div>
                        <div class="choose-color-space">
                            <template v-for="feature in product.features">

                                <div v-if="feature.type == 'color'" class="choose-color">
                                    <ul class="filter-li-product">
                                        <li v-for="list in feature.list">
                                            <div class="filter-checkbox">
                                                <input :id="`list_${list.id}`" :name="`feature_${feature.id}`" type="radio"
                                                    class="category-filter" :value="`list_${list.id}`">
                                                <label :for="`list_${list.id}`">
                                                    <div class="check-image">
                                                        <nuxt-img :src="list.image" width="118" height="160"></nuxt-img>
                                                    </div>
                                                    {{ list.name }}
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div v-if="feature.type == 'checkbox'" class="choose-sizes">
                                    <ul class="filter-li-product">
                                        <li v-for="list in feature.list">
                                            <div class="filter-checkbox">
                                                <input :id="`list_${list.id}`" :name="`feature_${feature.id}`" type="radio"
                                                    class="category-filter" :value="`list_${list.id}`">
                                                <label :for="`list_${list.id}`">
                                                    <span>
                                                        {{ list.name }}
                                                    </span>
                                                </label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </template>
                        </div>
                        <div class="d-flex align-items-center justify-content-between grid-gap-part-product">
                            <div id="mainDiv" class="count-div">
                                <CartCount
                                    v-model:count="product.cart_count"
                                    :count="product.cart_count"
                                    :product="product">
                                </CartCount>                        
                            </div>
                            <button @click="productAddToCart(product, product.cart_count)" :disabled="product.out_of_stock" type="button"
                                :class="`add-to-cart btn-add-product ${product.cart_id != '' ? 'active' : ''}`">
                                {{ translate('Add to cart') }}
                            </button>
                        </div>
                        <div class="product-main-text-part">
                            <h4 class="text-part-title">{{ translate('Core Details') }}</h4>
                     
                            <div class="product-text-info-part" v-html="product.desc"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>