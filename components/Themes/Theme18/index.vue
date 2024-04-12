<script setup>
const translate = inject('translate');
</script>
<script>
export default {
    props: {
        content: {},
        apiData: {},
        wishlistData: {},
        userData: {},
    },
};
</script>
<template>
    <section class="my-account favourites-part-start">
        <div class="container">
            <div class="main-part">
                <div class="row justify-content-center align-items-center mb-5 mob-justify-center" v-if="userData.isLogin">
                    <AccountSidebar></AccountSidebar>
                </div>
                <div class="row product">
                    <p v-if="wishlistData.list.length == 0" class="text-center text-dark fs-3">{{ translate('Your wishlist is empty') }}</p>
                    <template v-for="product in apiData.products">
                        <div v-if="product.in_wishlist == true" class="col-lg-3 col-md-4 col-6 mb-3">
                            <div class="w-100">
                                <Product :product="product"></Product>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </section>
</template>