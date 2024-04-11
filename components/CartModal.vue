<script setup>
const globalData = inject('globalData');
const translate = inject('translate');
const deleteCart = inject('deleteCart');

</script>
<script>
export default {
    props: {
        cartData: {},
    },
};

</script>

<template>
    <div v-if="cartData.count > 0" class="cart-pop-up" id="cartModal">
        <div class="main-part">
            <ul class="added-products-ul">
                <template v-for="item in cartData.list">
                    <li v-if="item.count > 0" class="single-product-row">
                        <nuxt-link :to="`/${item.product.url}`" class="img-link-part">
                            <img width="120" height="80" :src="`${item.product.image}`" :alt="`${item.product.name}`"
                                class="attachment-thumbnail size-thumbnail">
                        </nuxt-link>
                        <div class="main-part-cart">
                            <nuxt-link :to="`/${item.product.url}`" class="fs-black d-block">
                                {{ item.product.name }}
                            </nuxt-link>
                            <ul v-if="item.selected_features.length > 0">
                                <li v-for="list in item.selected_features" class="feature-name product-name size mb-0">
                                <p  v-if="list.type == 'checkbox'">{{ list.feature_name }}: <span>{{ list.list_name }}</span></p>
                                <p class="d-flex" v-if="list.type == 'color'">{{ list.feature_name }}: <div class="bg-color" :style="`background-color:${list.color}`"></div></p>
                                </li>
                            </ul>
                            <div class="product-count mt-2"><span class="count" lang="eng">{{ item.count }}</span>
                                <span> X
                                </span><span class="price" lang="eng">{{ item.price }}</span> {{globalData.currency}}
                            </div>
                            <div id="mainDiv" class="count-div">
                                <CartCount v-model:count="item.product.cart_count"
                                            :count="item.product.cart_count"
                                            :product="item.product">
                                </CartCount>
                            </div>
                        </div>
                        <a href="javascript:;" @click="deleteCart(item.product)" class="remove">
                            <img width="24" height="24" src="/images/deleteitem.svg"
                                class="attachment-thumbnail size-thumbnail" alt="">
                        </a>
                    </li>
                </template>
            </ul>
            <div class="row">
                <div class="col-lg-12">
                    <nuxt-link :to="`/${cartData.checkout_url}`" class="btn-dark w-100">
                        {{ translate('Pay Now') }}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
    <div v-else="cartData.count == 0" class="cart-pop-up">
        <div class="empty-image-part">
            <img src="/images/empty.svg" class="" width="" height="">
        </div>
        <div class="text-center">
            <nuxt-link :to="`/${globalData.langUrl}shop`" class="btn-dark w-100">
                {{ translate('Shop Now') }}
            </nuxt-link>
        </div>
    </div>
</template>