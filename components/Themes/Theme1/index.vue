<script setup lang="ts">

const { $getImage } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')

</script>

<script lang="ts">
export default {
    props: ["content"]
};

</script>

<template>

<section class="banner-part-start margin-bottom-global" :style="`background-image:url(${content.image})`">
     <div class="main-part">
        <div class="container">
            <div class="text-part">
                <h1 class="banner-part-start-title">{{ content.title }}</h1>
                <h5 class="banner-part-start-subtitle">{{ content.text }}
                </h5>
                <div class="d-flex align-items-center justify-content-center grid-gap-buttons btn-primary-hover">
                    <nuxt-link :to="`/${content.link.url}`" class="btn-primary">
                        {{ content.link.name }}
                    </nuxt-link>
                    <nuxt-link :to="`/${content.link.url}`"  class="btn-arrow">
                        <nuxt-img :src="content.arrowimage" width="12" height="12"></nuxt-img>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div> 
</section>

</template>

