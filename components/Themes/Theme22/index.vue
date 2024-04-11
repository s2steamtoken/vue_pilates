<script setup>

const { $sendApi, $getImage, $clearFilter } = useNuxtApp()

const globalData = inject('globalData')
const translate = inject('translate')
const Swal = inject('$swal')

const formData = ref({
    email: ''
})

const validateErrors = ref({});

async function sendEmail(e) {

    e.preventDefault();

    let apiData = await $sendApi(`/api/forms/emails`, formData.value)

    if (apiData.status != 200) {

        validateErrors.value = apiData.errors;

        if (apiData.message != undefined) {
            Swal.fire({
                title: apiData.title,
                text: apiData.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });

        }
    }
    else {

        validateErrors.value = {};

        Swal.fire({
            title: apiData.title,
            text: apiData.message,
            icon: 'success',
            confirmButtonText: 'OK'
        });

    }

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
     <section class="my-account wishlist-part-start">
        <div class="container">
            <div class="row justify-content-between align-items-center mb-5 mob-justify-center">
                <AccountSidebar></AccountSidebar>
            </div>
            <div class="row justify-content-between product">
                <div class="col-lg-3 col-md-4 col-6 mb-3">
                    <div class="game-each-part">
                        <div class="img-text-info">
                            <div class="game-img-part">
                                <div class="product_thumbnail_wrapper d-flex col-lg-12">
                                    <div class="product-image-slider w-100 h-100 product-img-first-elem  d-flex justify-content-center align-items-center w-100 h-100 active main-image"
                                        data-id="760" style="z-index: 3;">
                                        <div class="figure figure-main-img">
                                            <a href="">
                                                <nuxt-img width="281" height="177" class="game__image"
                                                    src="/images/model.svg" alt=""></nuxt-img>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="other-images-slider d-flex justify-content-center align-items-center product-image-slider w-100 h-100"
                                        data-id="760" style="z-index: 4;">
                                        <div class="figure">
                                            <a href="">
                                                <nuxt-img width="281" height="177" class="game__image"
                                                    src="/images/modelback.svg" alt=""></nuxt-img>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-part">
                            <button type="" class="add-to-wishlist btn-add-product">
                                <nuxt-img width="18" height="18" src="/images/heart.svg" alt="" class=""></nuxt-img>
                            </button>
                            <div class="d-flex align-items-center justify-content-center text-grid-gap">
                                <h5 class="online-shop-title">Sage Ribbed</h5>
                                <p class="online-shop-title">Seamless Bra</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <p class="online-shop-title price">$39.99</p>
                            </div>
                            <div class="sizes-absolute-part">
                                <div class="row grid-gap-product">

                                    <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                                        <button type="button" class="size-btn">xs</button>
                                    </div>

                                </div>
                            </div>
                            <button type="" class="add-cart-product btn-add-product">
                                <img width="18" height="18" src="/images/bag.svg" alt="" class="">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-6 mb-3">
                    <div class="game-each-part">
                        <div class="img-text-info">
                            <div class="game-img-part">
                                <div class="product_thumbnail_wrapper d-flex col-lg-12">
                                    <div class="product-image-slider w-100 h-100 product-img-first-elem  d-flex justify-content-center align-items-center w-100 h-100 active main-image"
                                        data-id="760" style="z-index: 3;">
                                        <div class="figure figure-main-img">
                                            <a href="">
                                                <img width="281" height="177" class="game__image"
                                                    src="/images/model.svg" alt="">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="other-images-slider d-flex justify-content-center align-items-center product-image-slider w-100 h-100"
                                        data-id="760" style="z-index: 4;">
                                        <div class="figure">
                                            <a href="">
                                                <img width="281" height="177" class="game__image"
                                                    src="/images/modelback.svg" alt="">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-part">
                            <button type="" class="add-to-wishlist btn-add-product">
                                <img width="18" height="18" src="/images/heart.svg" alt="" class="">
                            </button>
                            <div class="d-flex align-items-center justify-content-center text-grid-gap">
                                <h5 class="online-shop-title">Sage Ribbed</h5>
                                <p class="online-shop-title">Seamless Bra</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <p class="online-shop-title price">$39.99</p>
                            </div>
                            <div class="sizes-absolute-part">
                                <div class="row grid-gap-product">

                                    <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                                        <button type="button" class="size-btn">xs</button>
                                    </div>

                                </div>
                            </div>
                            <button type="" class="add-cart-product btn-add-product">
                                <img width="18" height="18" src="/images/bag.svg" alt="" class="">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-6 mb-3">
                    <div class="game-each-part">
                        <div class="img-text-info">
                            <div class="game-img-part">
                                <div class="product_thumbnail_wrapper d-flex col-lg-12">
                                    <div class="product-image-slider w-100 h-100 product-img-first-elem  d-flex justify-content-center align-items-center w-100 h-100 active main-image"
                                        data-id="760" style="z-index: 3;">
                                        <div class="figure figure-main-img">
                                            <a href="">
                                                <img width="281" height="177" class="game__image"
                                                    src="/images/model.svg" alt="">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="other-images-slider d-flex justify-content-center align-items-center product-image-slider w-100 h-100"
                                        data-id="760" style="z-index: 4;">
                                        <div class="figure">
                                            <a href="">
                                                <img width="281" height="177" class="game__image"
                                                    src="/images/modelback.svg" alt="">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-part">
                            <button type="" class="add-to-wishlist btn-add-product">
                                <img width="18" height="18" src="/images/heart.svg" alt="" class="">
                            </button>
                            <div class="d-flex align-items-center justify-content-center text-grid-gap">
                                <h5 class="online-shop-title">Sage Ribbed</h5>
                                <p class="online-shop-title">Seamless Bra</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <p class="online-shop-title price">$39.99</p>
                            </div>
                            <div class="sizes-absolute-part">
                                <div class="row grid-gap-product">

                                    <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                                        <button type="button" class="size-btn">xs</button>
                                    </div>

                                </div>
                            </div>
                            <button type="" class="add-cart-product btn-add-product">
                                <img width="18" height="18" src="/images/bag.svg" alt="" class="">
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-4 col-6 mb-3">
                    <div class="game-each-part">
                        <div class="img-text-info">
                            <div class="game-img-part">
                                <div class="product_thumbnail_wrapper d-flex col-lg-12">
                                    <div class="product-image-slider w-100 h-100 product-img-first-elem  d-flex justify-content-center align-items-center w-100 h-100 active main-image"
                                        data-id="760" style="z-index: 3;">
                                        <div class="figure figure-main-img">
                                            <a href="">
                                                <img width="281" height="177" class="game__image"
                                                    src="/images/model.svg" alt="">
                                            </a>
                                        </div>
                                    </div>
                                    <div class="other-images-slider d-flex justify-content-center align-items-center product-image-slider w-100 h-100"
                                        data-id="760" style="z-index: 4;">
                                        <div class="figure">
                                            <a href="">
                                                <img width="281" height="177" class="game__image"
                                                    src="/images/modelback.svg" alt="">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-part">
                            <button type="" class="add-to-wishlist btn-add-product">
                                <img width="18" height="18" src="/images/heart.svg" alt="" class="">
                            </button>
                            <div class="d-flex align-items-center justify-content-center text-grid-gap">
                                <h5 class="online-shop-title">Sage Ribbed</h5>
                                <p class="online-shop-title">Seamless Bra</p>
                            </div>
                            <div class="d-flex align-items-center justify-content-center">
                                <p class="online-shop-title price">$39.99</p>
                            </div>
                            <div class="sizes-absolute-part">
                                <div class="row grid-gap-product">

                                    <div class="col-lg-2 col-md-2 col-sm-2 col-4">
                                        <button type="button" class="size-btn">xs</button>
                                    </div>

                                </div>
                            </div>
                            <button type="" class="add-cart-product btn-add-product">
                                <img width="18" height="18" src="/images/bag.svg" alt="" class="">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> 
</template>