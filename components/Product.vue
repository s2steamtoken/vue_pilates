<script setup>
const globalData = inject('globalData')
const translate = inject('translate')
const addToCart = inject('addToCart')
const changeWishlist = inject('changeWishlist')
</script>
<script>
export default {
    props: {
        product: {},
    },
    data() {
        return {
            active: 0,
            mouseOut: true,
        }
    },
    methods: {
        imageChange(bin) {
            this.active = bin
            this.mouseOut = (bin == 0)
        },
    },
};
</script>


<template>
    <div class="game-each-part">
        <div class="img-text-info">
            <div class="game-img-part">
                <div class="product_thumbnail_wrapper d-flex col-lg-12">
                    <div @mouseover="imageChange(0)" :class="`product-image-slider w-100 h-100 product-img-first-elem  d-flex justify-content-center align-items-center w-100 h-100 ${active == 0 ? 'active' : ''} main-image`" :style="`z-index: ${mouseOut ? 3 : ((active == 0 ? 3 : 4))}`">
                        <div class="figure figure-main-img">
                            <nuxt-link :to="`/${product.url}`" class="">
                                <img :src="product.image" width="281" height="177" class="game__image"></img>
                            </nuxt-link>
                        </div>
                    </div>
                    <div @mouseout="imageChange(0)" @mouseover="imageChange(bin)" v-for="(image, bin) in product.other_images" :class="`${active == (bin + 1) ? 'active' : ''} other-images-slider d-flex justify-content-center align-items-center product-image-slider w-100 h-100`" :style="`z-index: ${mouseOut ? 4 : ((active == (bin + 1) ? 3 : 4))};`">
                        <div class="figure">
                            <nuxt-link :to="`/${product.url}`" class="">
                                <img :src="image" width="281" height="177" class="game__image other__images"></img>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-part">
            <button @click="changeWishlist(product)" :class="product.in_wishlist ? 'active' : ''"
                class="add-to-wishlist btn-add-product">
                <img width="18" height="18" src="/images/heart.svg" alt="" class="heart">
                <img width="18" height="18" src="/images/whiteheart.svg" alt="" class="white-heart">
            </button>
            <div class="d-flex align-items-center justify-content-center text-grid-gap">
                <h5 class="online-shop-title">{{ product.name }}</h5>
            </div>
            <div class="d-flex align-items-center justify-content-center">
                <p class="online-shop-title price">{{ globalData.currency_title }} {{ product.price }}</p>
            </div>
            <button v-if="product.features.length == 0" data-bs-toggle="modal" data-bs-target="#addtocardmodal" @click="addToCart(product, 1)" :disabled="product.out_of_stock" type="button"
                :class="`add-cart-product btn-add-product ${product.cart_id != '' ? 'active' : ''}`">
                <img width="18" height="18" src="/images/bag.svg" alt="" class="basket">
                <img width="18" height="18" src="/images/white-basket.svg" alt="" class="white-basket">
            </button>
            <nuxt-link v-else :to="`/${product.url}`" type="button"
                :class="`add-cart-product btn-add-product ${product.cart_id != '' ? 'active' : ''}`">
                <img width="18" height="18" src="/images/bag.svg" alt="" class="basket">
                <img width="18" height="18" src="/images/white-basket.svg" alt="" class="white-basket">
            </nuxt-link>
        </div>
    </div>
</template>