<script setup>
const { $clearFilter } = useNuxtApp()
// const globalData = inject('globalData')
const siteLang = inject('siteLang')
const translate = inject('translate')
const loadCart = inject('loadCart')

const router = useRouter()
const route = useRoute()

const filterData = ref({
    search: route.query.search != undefined ? route.query.search : ''
});

const isMenuActive = ref(false)
// const openedMenu = ref(false)

function search() {
    closeSearch()
    router.push({
        path: '/menu',
        force: true,
        query: $clearFilter(filterData.value),
    });
}

function closeSearch() {
    openedSearch.value = false
}

function openSearch() {
    if (openedSearch.value) {
        search()
    }
    else {
        openedSearch.value = true
    }
}

function openMenu() {
    isMenuActive.value = !isMenuActive.value
}

</script>

<script>
export default {
    props: {
        cartData: {},
        wishlistData: {},
        userData: {},
        apiData: {},
        globalData: {},
    },
    // data() {
    //     return {
    //         isMenuActive: false
    //     }
    // },
    // mounted() {
    //     window.addEventListener('scroll', this.updateScroll);
    // },
    // methods: {
    //     openMenu(){
    //         this.isMenuActive = true;
    //     }
    // },
};

</script>

<template>
    <div :class="`${globalData.fixed_menu ? '' : 'position-sticky top-0 start-0'} `">
        <header :class="`header  ${globalData.fixed_menu ? 'header-position-absolute ' : ''} `">
           <div class="container">
               <div class="main-header">
                   <div class="row justify-content-between align-items-center gx-0">
                       <div class="col-auto">
                           <div class="d-flex align-items-center">
                               <nuxt-link :to="`/${globalData.langUrl}`" class="logo-part menu-list">
                                   <img width="52" height="70" src="/images/logo.svg" alt="" class="logo desktop-img">
                               </nuxt-link>
                           </div>
                       </div>
                       <div class="col-auto">
                           <nav class="display-none-mob mob-menu-part">
                               <ul>
                                   <template v-for="menu in globalData.menus">
                                       <li v-if="menu.position_type.includes('header')">
                                           <nuxt-link :to="`/${menu.url}`">
                                               {{ menu.name }}
                                           </nuxt-link>
                                       </li>
                                   </template>
                               </ul>
                           </nav>
                       </div>
                       <div class="col-auto mob-d-none">
                           <div class="d-flex align-items-center grid-gap-menu">
                               <div class="pop-up">
                                   <div class="dropdown languages">
                                       <div class="dropdown languages-menu"><button class="btn dropdown-toggle"
                                               type="button" data-bs-toggle="dropdown" id="dropdownMenuButton"
                                               aria-expanded="false"> {{ globalData.site_lang
                                               }}</button>
                                           <ul class="dropdown-menu" style="">
                                               <template v-for="(url, lang) in globalData.lang_urls">
                                                   <li v-if="lang != globalData.site_lang" class="language">
                                                       <nuxt-link :to="`/${url}`"
                                                           class="row-start lang-change-link dropdown-item">
                                                           {{ lang }}
                                                       </nuxt-link>
                                                   </li>
                                               </template>
                                           </ul>
                                       </div>
                                   </div>
                               </div>
                               <div class="pop-up">
                                   <div class="dropdown languages-menu">
                                       <nuxt-link
                                           :to="`/${globalData.langUrl}${userData.isLogin ? 'my-account' : 'sign-in'}`"
                                           class="btn dropdown-toggle">
                                           <img width="18" height="18" src="/images/person.svg?1" alt="" class="">
                                       </nuxt-link>
                                   </div>
                               </div>
                               <div class="pop-up">
                                   <div class="dropdown languages-menu count-part">
                                       <button class="btn dropdown-toggle" type="button" aria-expanded="false"
                                           @click="loadCart" data-bs-toggle="modal" data-bs-target="#addtoCart">
                                           <img width="18" height="18" src="/images/bag.svg?1" alt="" class="">
                                       </button>
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
                               <div class="">
                                   <nuxt-link :to="`/${globalData.langUrl}contact-us`" class="btn-secondary">
                                       <img width="21" height="21" src="/images/whatsapp.svg" alt="" class="">
                                       {{ translate('Contact') }}
                                   </nuxt-link>
                               </div>
                           </div>
                       </div>
                       <div class="col-auto display-none-desktop">
                           <div class="pop-up">
                               <div class="dropdown languages">
                                   <div class="dropdown languages-menu"><button class="btn dropdown-toggle"
                                           type="button" data-bs-toggle="dropdown" id="dropdownMenuButton"
                                           aria-expanded="false"> {{
                                               globalData.site_lang
                                           }}</button>
                                       <ul class="dropdown-menu" style="">
                                           <template v-for="(url, lang) in globalData.lang_urls">
                                               <li v-if="lang != globalData.site_lang" class="language">
                                                   <nuxt-link :to="`/${url}`"
                                                       class="row-start lang-change-link dropdown-item">
                                                       {{ lang }}
                                                   </nuxt-link>
                                               </li>
                                           </template>
                                       </ul>
                                   </div>
                               </div>
                           </div>
                           <button @click="openMenu" type="button"
                               class="display-none-desktop mob-menu-button open-menu-btn">
                               <img src="/images/mob-menu.svg" class="" alt="" width="16" height="16">
                           </button>
                       </div>
                   </div>
               </div>
           </div>
       </header>
        <!-- {{ isMenuActive }} -->
        <div :class="`modal fade card-modal shopping-cart`" id="addtoCart">
            <div class="modal-dialog">
                <div class="modal-content dropdown-menu">
                    <div class="cart-dropdown" id="BasketDropDown">
                        <div class="d-flex justify-content-between align-items-center border-bottom-part title">
                            <h2 class="title-shopping-cart">
                                {{ translate('Products') }}
                            </h2>
                            <button type="button" class="close remove-popup" data-bs-dismiss="modal" aria-label="Close">
                                <img width="24" height="24" src="/images/x.svg"
                                    class="attachment-thumbnail size-thumbnail" alt="">
                            </button>
                        </div>
                        <CartModal :cartData="cartData">
                        </CartModal>
                    </div>
                </div>
            </div>
        </div>
        <div :class="`modal fade card-modal add-to-cart-modal`" id="addtocardmodal">
            <div class="modal-dialog">
                <div class="modal-content dropdown-menu">
                    <div class="cart-dropdown" id="BasketDropDown">
                        <div class="cart-pop-up p-3">
                            <h5 class="product-added-info">{{ translate('Product added to cart!!') }}</h5>
                            <div class="empty-image-part">
                                <img src="/images/fullofproduct.svg" class="" width="312" height="280">
                            </div>
                            <div class="number-of-product">
                                <p class="count-of-product">+1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav :class="`display-none-mob mob-menu-part-hidden ${isMenuActive == true ? 'opened' : ''}`">
            <div class="row justify-content-between padding-part-row align-items-center">
                <div class="col-auto">
                    <div class="d-flex align-items-center">
                        <nuxt-link :to="`/${globalData.langUrl}`" class="logo-part menu-list">
                            <img width="52" height="70" src="/images/logo.svg" alt="" class="logo desktop-img">
                        </nuxt-link>
                    </div>
                </div>
                <div class="col-auto display-none-desktop">
                    <button @click="openMenu" type="button" class="display-none-desktop mob-menu-button open-menu-btn">
                        <img src="/images/x.svg" class="" alt="" width="16" height="16">
                    </button>
                </div>
            </div>
            <ul>
                <template v-for="menu in globalData.menus">
                    <li v-if="menu.position_type.includes('header')">
                        <nuxt-link :to="`/${menu.url}`" @click="openMenu">
                            {{ menu.name }}
                        </nuxt-link>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>