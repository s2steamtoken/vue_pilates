<script setup>

const globalData = inject('globalData')
const translate = inject('translate')

function openOrderInfo(order){
    if(order.opened == 1){
        order.opened = 0
    }
    else {
        order.opened = 1
    }

}

</script>

<script>
export default {
    props: {
        content: {},
        apiData: {},
        cartData: {},
        userData: {},
        globalData: {},
    },
};

</script>

<template v-if="apiData.orders != undefined">
  <sectiion class="my-account order-history">
        <div class="container">
            <div class="row justify-content-between align-items-center mb-5 mob-justify-center">
                <AccountSidebar></AccountSidebar>
            </div>
            <div v-if="apiData.orders.length == 0" class="text-center py-4">
                <h5 class="my-account-text mb-4">
                    {{ translate('No orders found') }}
                </h5>
                <nuxt-link :to="`/${globalData.langUrl}shop`" class="btn-secondary">
                    {{ translate('Shop Now') }}
                </nuxt-link>
            </div>

            <div class="order-history-single" v-for="order in apiData.orders">
                <div class="row bg-white-part click-to-open align-items-center" @click="openOrderInfo(order)">
                    <div class="col-lg-6">
                        <div class="row justify-content-between align-items-center">
                            <div class="col-auto">
                                <h6 class="order-history-title">
                                    {{ translate('Order N ') }} {{ order.id }}
                                </h6>
                            </div>
                            <div class="col-auto">
                                <div class="order-history-details">
                                    <p class="order-history-text">
                                        {{ order.insert_date }}
                                    </p>
                                    <p class="order-history-text">
                                        {{ order.total }} {{ globalData.currency }}
                                    </p>
                                    <p class="cancelled-part">  {{ order.status_name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-auto">
                        <div class="row">
                            <div class="col-auto p-0">
                                <button type="button" class="">
                                    <nuxt-img src="/images/notification.svg" width="48" height="48" class="" alt=""></nuxt-img>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-account-hidden-part" :style="`display: ${order.opened != undefined && order.opened == 1 ? 'block' : 'none'}`">
                    <div class="row bg-white-part align-items-center">
                        <template v-for="item in order.products">
                            <div v-if="item.product != undefined" class="col-lg-6 col-md-6 col-sm-12 col-12"  >
                                <div class="d-flex justify-content-between align-items-center mob-wrap-part">
                                    <div class="d-flex img-text-grid align-items-center">
                                        <div class="image-part">
                                            <nuxt-img :src="item.product.image" width="120" height="150" class="" alt=""></nuxt-img>
                                        </div>
                                        <div class="text-part">
                                            <h5 class="gift-card-text">
                                                {{ item.product.name }}
                                            </h5>
                                            <template v-for="feature in item.selected_features">
                                                <p class="size-part">{{ feature.feature_name }}:<span>{{ feature.list_name }}</span></p>
                                            </template>
                                        </div>
                                    </div>
                                    <p class=""> {{ item.count }} x <span class=""> {{ item.price }} {{ globalData.currency_title }}</span></p>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
  </sectiion> 

</template>

