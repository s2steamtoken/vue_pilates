<script setup>

const { $getImage } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const logOut = inject('logOut')
</script>

<template>
    <!-- <div class="col-lg-2">
        <div class="row">
            <div class="oval">
                <p class="oval-inside-text">{{ translate('Welcome to your Pilates Account') }}</p>
            </div>
        </div>
    </div> -->
    <div class="col-auto">
        <div class="row">
            <div class="col-sm-auto col-12">
                <nuxt-link :to="`/${globalData.langUrl}my-account`" class="d-flex bg-white-link">
                    <div class="img-part">
                        <img src="/images/person.svg">
                    </div>
                    <div class="text-part">
                        <p class="text-paragraph-part">{{ translate('Account Info') }}</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-sm-auto col-12">
                <nuxt-link :to="`/${globalData.langUrl}wishlist`" class="d-flex bg-white-link">
                    <div class="img-part">
                        <img src="/images/heart.svg">
                    </div>
                    <div class="text-part">
                        <p class="text-paragraph-part">{{ translate('Wishlist') }}</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-sm-auto col-12">
                <nuxt-link :to="`/${globalData.langUrl}my-orders`" class="d-flex bg-white-link">
                    <div class="img-part">
                        <img src="/images/bag.svg">
                    </div>
                    <div class="text-part">
                        <p class="text-paragraph-part">{{ translate('Order History') }}</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-sm-auto col-12">
                <nuxt-link :to="`/${globalData.langUrl}my-addresses`" class="d-flex bg-white-link">
                    <div class="img-part">
                        <img src="/images/address.svg">
                    </div>
                    <div class="text-part">
                        <p class="text-paragraph-part">{{ translate('Addresses') }}</p>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-sm-auto col-12">
                <a @click="logOut" href="javascript:;" class="d-flex bg-white-link">
                    <div class="img-part">
                        <img src="/images/address.svg">
                    </div>
                    <div class="text-part">
                        <p class="text-paragraph-part">{{ translate('Log Out') }}</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>