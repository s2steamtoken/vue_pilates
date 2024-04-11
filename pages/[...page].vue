<script setup>

// THEMES START
import Header from "~~/components/Layouts/Header/index.vue";
import Seo from "~~/components/Layouts/Seo/index.vue";
import Footer from "~~/components/Layouts/Footer/index.vue";

import Theme1 from "~~/components/Themes/Theme1/index.vue";
import Theme2 from "~~/components/Themes/Theme2/index.vue";
import Theme3 from "~~/components/Themes/Theme3/index.vue";
import Theme4 from "~~/components/Themes/Theme4/index.vue";
import Theme5 from "~~/components/Themes/Theme5/index.vue";
import Theme6 from "~~/components/Themes/Theme6/index.vue";
import Theme7 from "~~/components/Themes/Theme7/index.vue";
import Theme8 from "~~/components/Themes/Theme8/index.vue";
import Theme9 from "~~/components/Themes/Theme9/index.vue";
import Theme10 from "~~/components/Themes/Theme10/index.vue";
import Theme11 from "~~/components/Themes/Theme11/index.vue";
import Theme12 from "~~/components/Themes/Theme12/index.vue";
import Theme13 from "~~/components/Themes/Theme13/index.vue";
import Theme14 from "~~/components/Themes/Theme14/index.vue";
import Theme15 from "~~/components/Themes/Theme15/index.vue";
import Theme16 from "~~/components/Themes/Theme16/index.vue";
import Theme17 from "~~/components/Themes/Theme17/index.vue";
import Theme18 from "~~/components/Themes/Theme18/index.vue";
import Theme19 from "~~/components/Themes/Theme19/index.vue";
import Theme20 from "~~/components/Themes/Theme20/index.vue";
import Theme21 from "~~/components/Themes/Theme21/index.vue";
// import Theme22 from "~~/components/Themes/Theme22/index.vue";
import Theme23 from "~~/components/Themes/Theme23/index.vue";
import Theme24 from "~~/components/Themes/Theme24/index.vue";
import Theme25 from "~~/components/Themes/Theme25/index.vue";
import Theme26 from "~~/components/Themes/Theme26/index.vue";

// THEMES END

const { $generateRandomString, $sendApi } = useNuxtApp()
const $store = useNuxtApp()

const route = useRoute();
const router = useRouter()

const pageUrl = computed(() => route.params.page);

const data = ref($store.globalContent)

const content = ref(toRaw(data.value));
const apiData = ref(toRaw(data.value));
const globalData = ref(toRaw($store.globalData))

function changeApiData(newValue){
    
    newValue.forEach((key, element) => {
        console.log(key);
        console.log(element);
    });

    content.value = toRaw(newValue);
}

const translate = function (string) {

    let translations = toRaw(globalData.value.translations);

    let result = translations.filter(item => {
    	return item.key === string
    });

    return result.length ? result[0].value : "";

}

const changeCurrency = async function (string){
    await $store.sessionUpdate({ currency: string })
    location.reload()
}

provide('globalData', globalData.value);
provide('translate', translate);
provide('siteLang', $store.siteLang);
provide('segments', $store.segments);
provide('changeApiData', changeApiData);
provide('changeCurrency', changeCurrency);

// CART FUNCTIONS

const cartData = ref(toRaw(data.value.cart != "" ? data.value.cart : {}));

const addToCart = async function(data, count = 1, features = {}, comment = "") {

    let product = toRaw(data);
    features = toRaw(features);

    let addCartApi = await $sendApi('/api/cart/add', {
        product_id: product.id,
        count: count,
        features: features,
        comment: comment
    });

    cartData.value = addCartApi
    data.cart_id = addCartApi.cart_id
    
    for(let i in apiData.value.products){
        let i_product = apiData.value.products[i];
        if(i_product.id == data.id){

            i_product.cart_id = addCartApi.cart_id;
            i_product.cart_count = addCartApi.cart_count;

            apiData.value.products[i] = i_product;
        }

    }

    if(apiData.value.product != undefined){
        if(apiData.value.product.id == data.id){
            apiData.value.product.cart_count = addCartApi.cart_count;
            apiData.value.product.cart_id = addCartApi.cart_id;
        }
    }

}

const updateCart = async function(data, count){

    if(count == 0){
        deleteCart(data);
        return;
    }

    data = toRaw(data);

    if(data.cart_id == "" || data.cart_id == 0) return;

    let updateCartApi = await $sendApi(`/api/cart/update`, {
        cart_id: data.cart_id,
        count: count,
    });

    cartData.value = updateCartApi

    for(let i in apiData.value.products){
        let i_product = apiData.value.products[i];
        if(i_product.cart_id == data.cart_id){
            console.log("EQ " + i_product.id);
            i_product.cart_count = updateCartApi.cart_count;
            apiData.value.products[i] = i_product;
        }
    }

    if(apiData.value.product != undefined){
        if(apiData.value.product.cart_id == data.cart_id){
            apiData.value.product.cart_count = updateCartApi.cart_count;
        }
    }

}

const deleteCart = async function (cart_data) {

    cart_data = toRaw(cart_data);
    let deleteCartApi = await $sendApi(`/api/cart/remove`, {
        cart_id: cart_data.cart_id,
    });

    cartData.value = deleteCartApi

    for (let i in data.value.themes){
        let i_theme = data.value.themes[i];
        if(i_theme.value.products !== undefined){
            let theme_products = i_theme.value.products;
            for (let i in theme_products) {
                let i_product = theme_products[i];
                if (i_product.cart_id == cart_data.cart_id) {
                    i_product.cart_id = '';
                    i_product.cart_count = 0;
                    theme_products[i] = i_product;
                }
            }
        }
    }
    
    for (let i in apiData.value.products) {
        let i_product = apiData.value.products[i];
        if (i_product.cart_id == cart_data.cart_id) {
            i_product.cart_id = '';
            i_product.cart_count = 0;
            apiData.value.products[i] = i_product;
        }
    }
    if (apiData.value.product != undefined) {
        if (apiData.value.product.cart_id == cart_data.cart_id) {
            apiData.value.product.cart_count = 1
        }
    }
}

const loadCart = async function(){

    let newApiData = await $sendApi(`/api/cart/get`, {});

    cartData.value = newApiData;
}

const replaceCart = function(newCart){
    cartData.value = newCart;
}

provide('addToCart', addToCart);
provide('updateCart', updateCart);
provide('deleteCart', deleteCart);
provide('loadCart', loadCart);
provide('replaceCart', replaceCart);

// Wishlist functions

const wishlistData = ref(toRaw(data.value.wishlist));

const changeWishlist = async function(data) {

    let product = toRaw(data);

    let wishlistApi = await $sendApi('/api/wishlist/change', {
        product_id: product.id,
    });

    let in_wishlist = !data.in_wishlist
    
    data.in_wishlist = in_wishlist

    wishlistData.value = wishlistApi

}

provide('changeWishlist', changeWishlist);

// User data

const userData = ref(toRaw(data.value.user));
userData.value.isLogin = (userData.value.id != undefined ? true : false)

async function logOut(){

    $store.sessionUpdate({ token: "" })

    reloadNuxtApp({
        path: '/' + globalData.value.langUrl,
        ttl: 1000,
    });

}

provide('logOut', logOut);

// Validation

function validate(data, rules){

    rules = toRaw(rules);
    let errors = {};

    console.log(rules);

    for (let key in rules) {

        let rule = rules[key];
        let value = data[key];

        value = value.trim();

        if(value == "" || value == " "){
            errors[key] = true;
        }

        if(rule.minLength != undefined){
            if(value.length < rule.minLength){
                errors[key] = true;
            }
        }

        if(rule.onlyLetters){
            if(!/\d/.test(value)){
                errors[key] = true;
            }
        }
        
        if(rule.isEmail){
            if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)){
                errors[key] = true;
            }
        }

    }

    console.log(errors);
    return errors;

}

provide('validate', validate);

// Modals

function openModal(modal_id){
    let myModal = bootstrap.Modal.getOrCreateInstance(modal_id);
    // var myModal = new bootstrap.Modal(document.getElementById(modal_id)); 
    myModal.show()
}

function closeModal(modal_id){

    let buttons = document.querySelectorAll("#" + modal_id + " [data-bs-dismiss]");
    if(buttons.length > 0){
        buttons[0].click();
    }
    else {

        let body = document.getElementsByTagName('body')[0];
        body.classList.remove('modal-open');
        body.setAttribute('style', '');
        let modalBackground = document.querySelector('.modal-backdrop')
        if (modalBackground) {
            modalBackground.remove()
        }
        
        classList.remove('show');
        document.getElementById(modal_id).setAttribute('style', 'display: none');

    }

    // var myModal = new bootstrap.Modal(document.getElementById(modal_id)); 
    // console.log(myModal);
    // myModal.hide()
}

provide('openModal', openModal);
provide('closeModal', closeModal);

watch(
    () => route.path,
    () => {
        console.log('aaaa');
    },
    );

// watch(
//   () => route.fullPath,
//   async () => {
//     console.log("route fullPath updated", route.fullPath);
//   }
// );

</script>

<script>

const Themes = {
    Theme1, Theme2, Theme3, Theme4, Theme5, Theme6, Theme7, Theme8, Theme9,Theme10,Theme11, Theme12, Theme13, Theme14, Theme15, Theme16, Theme17, Theme18, Theme19, Theme20, Theme21,Theme23,Theme24, Theme25, Theme26 
}

export default {
    props: ["appMedia"],
    components: Themes,
    methods(){

    },
    data() {
        return {
            globalData: {},
            components: [],
            development: false,
        };
    },
    mounted() {
        const url = useRequestURL();
        this.development = url.search == "?test" ? true : false;
    // },
    // watch: {
        // $route(to, from){

        // console.log('aaaaa');

    //         let modals = document.querySelector('.modal.show');
    //         if(modals != undefined){
    //             let modal_id = modals.getAttribute('id')

    //             var myModal = new bootstrap.Modal(document.getElementById(modal_id)); 
    //             console.log(myModal);
    //             myModal.hide()

    //         }

            let body = document.getElementsByTagName('body')[0];
            body.classList.remove('modal-open');
            body.setAttribute('style', '');
            let modalBackground = document.querySelector('.modal-backdrop')
            console.log(modalBackground);
            if (modalBackground) {
                modalBackground.remove()
            }

        // }
    }
};

</script>

<template>
    
    <div v-if="data?.themes != undefined" :class="`${data?.site_lang} page_${$store.segments.join('_')}`">

        <Seo :content="data?.seo" />

        <Header
            :cartData="cartData"
            :wishlistData="wishlistData"
            :userData="userData"
            :apiData="apiData"
            :globalData="globalData"
            >
        </Header>

        <div>
            <template v-for="(item) in data?.themes">
                <p v-if="development"
                    class="bg-dark fw-bold text-white py-2 text-center">
                    {{ item.theme }}
                </p>
                <component 
                    :is="`Theme${item.theme}`"
                    :content="item?.value"
                    :cartData="cartData"
                    :wishlistData="wishlistData"
                    :apiData="apiData"
                    :userData="userData"
                    v-model:apiData="apiData"
                    :globalData="globalData"
                    />
            </template>
        </div>

        <Footer
            :cartData="cartData"
            :wishlistData="wishlistData"
            :userData="userData"
            :apiData="apiData"
            :globalData="globalData"
        ></Footer>

        <div style="width: 100%; height: 32px; border: 0; outline: 0; position: fixed; z-index: 9999; bottom: 0" v-if="apiData.admin_iframe != undefined && apiData.admin_iframe != ''">
            <iframe style="width: 100%" :src="apiData.admin_iframe"></iframe>
        </div>

    </div>
</template>