<script setup lang="ts">

const { $getImage } = useNuxtApp()
const translate = inject('translate')
const globalData = inject('globalData')

</script>

<script lang="ts">
export default {
    props: ["content", "globalData", "apiData"]
};


</script>

<template>
    <section class="online-shop-part">
        <div class="main-part">
            <div class="container">
                <h2 class="online-shop-title main-title">
                    {{ content.text_title }}
                </h2>
                <h5 class="online-shop-subtitle main-subtitle">
                    {{ content.subtitle_text }}
                </h5>
                <div class="row product">
                    <div v-for="product in content.products" class="col-lg-3 col-md-4 col-6 mb-3">
                        <Product :product="product"></Product>
                    </div>
                </div>
                <div
                    class="d-flex align-items-center justify-content-center grid-gap-buttons btn-primary-hover mob-d-none mt-5">
                    <nuxt-link :to="`/${content.link.url}`" class="btn-primary">
                        {{ content.link.name }}
                    </nuxt-link>
                     <nuxt-link to="#" class="btn-arrow">
                        <nuxt-img src="/images/arrow.svg" width="8" height="14"></nuxt-img>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>
</template>