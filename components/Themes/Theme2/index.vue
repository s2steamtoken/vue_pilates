<script setup lang="ts">


const { $getImage } = useNuxtApp()
// const globalData = inject('globalData')

</script>

<script lang="ts">
export default {
    props: ["content", "globalData"]
};

</script>

<template>

    <section class="product-categories">
        <div class="container">
            <div class="row justify-content-center w-100 grid-gap-part m-0">
                <div class="single-product" v-for="item in content.appendimages">
                    <nuxt-link to="#" class="">
                        <nuxt-img width="300" height="320" :src="item.mainimage" class="main-img-part" />
                        <nuxt-img v-if="item.logoimage" width="179" height="38" :src="item.logoimage"
                            class="logo-image" />
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>

</template>