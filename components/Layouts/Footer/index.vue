<script setup>
const globalData = inject('globalData')
const translate = inject('translate')
</script>
<script>
export default {
    props: ["content", "userData", "cartData", "wishlistData"]
};


</script>

<template>
    <div>
        <footer class="footer">
            <div class="footer-main-start">
                <div class="container">
                    <div class="main-part">

                        <div v-if="globalData.contacts.social.length >= 1" class="footer-social-part">
                            <a target="_blank" :href="`${globalData.contacts.social[0].link}`"
                                class="footer-title social-media-first">{{ globalData.contacts.social[0].name }}</a>
                        </div>
                        <div class="footer-logo">
                            <img src="/images/footerlogo.svg" width="629" height="129">
                        </div>
                        <div v-if="globalData.contacts.social.length >= 1" class="footer-social-part">
                            <a target="_blank" :href="`${globalData.contacts.social[1].link}`"
                                class="footer-title social-media-second">{{ globalData.contacts.social[1].name }}</a>
                        </div>
                    </div>
                    <hr>
                    <div class="last-part-footer">
                        <h6 class="last-footer-title">{{ translate('This website is made by') }}<a
                                href="https://www.s2s.am"> S2S</a></h6>
                        <div class="footer-text-part">@2024
                            <template v-for="menu in globalData.menus">
                                <div v-if="menu.position_type.includes('footer')">
                                    <nuxt-link :to="`/${menu.url}`">
                                        {{ menu.name }}
                                    </nuxt-link>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div class="header menu-footer-mobile display-none-desktop">
            <div class="d-flex align-items-center grid-gap-menu justify-content-between">
                <div class="d-flex grid-gap-footer-links">
                    <div class="pop-up">
                        <div class="dropdown languages-menu">
                            <nuxt-link :to="`/${globalData.langUrl}${userData.isLogin ? 'my-account' : 'sign-in'}`"
                                class="btn dropdown-toggle">
                                <img width="18" height="18" src="/images/person.svg?1" alt="" class="">
                            </nuxt-link>
                        </div>
                    </div>
                    <div class="pop-up">
                        <div class="dropdown languages-menu count-part">
                            <nuxt-link  :to="`/${globalData.langUrl}checkout`" class="btn dropdown-toggle" >
                                <img width="18" height="18" src="/images/bag.svg?1" alt="" class="">
                            </nuxt-link>
                            <div class="count-added-products"
                                :style="`opacity: ${(cartData.count != undefined && cartData.count > 0) ? '1' : '0'}`">
                                <span
                                    :style="`display: ${(cartData.count != undefined && cartData.count > 0) ? 'block' : 'none'}`"
                                    class="cart-count count-badge fs-11 bold">
                                    {{ (cartData.count != undefined) ? cartData.count : 0 }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pop-up">
                        <div class="dropdown languages-menu">
                            <nuxt-link :to="`/${globalData.langUrl}wishlist`" class="btn dropdown-toggle">
                                <img width="18" height="18" src="/images/heart.svg?1" alt="" class="">
                            </nuxt-link>
                            <div class="count-added-products"
                                :style="`opacity: ${(wishlistData.count != undefined && wishlistData.count > 0) ? '1' : '0'}`">
                                <span
                                    :style="`display: ${(wishlistData.count != undefined && wishlistData.count > 0) ? 'block' : 'none'}`"
                                    class="wishlist-count count-badge fs-11 bold">
                                    {{ (wishlistData.count != undefined) ? wishlistData.count : 0 }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="">
                    <nuxt-link :to="`/${url}`" class="btn-secondary">
                        <img width="21" height="21" src="/images/whatsapp.svg" alt="" class="">
                        {{ translate('Contact') }}
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>