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
   <section class="pillates-banner-start" :style="`background-image:url(${content.background_image})`">
        <div class="container">
            <div class="main-part">
                <div class="text-part">
                    <div class="appearing-part first">
                        <h2 class="appearing-text">  {{ content.text_first }}</h2>
                    </div>
                    <div class="appearing-part second">
                        <h2 class="appearing-text">  {{ content.text_third }}</h2>
                    </div>
                    <div class="pilates-image">
                        <nuxt-img :src="content.image" width="416" height="102"></nuxt-img>
                    </div>
                    <div class="appearing-part  third">
                        <h2 class="appearing-text">  {{ content.text_second }}</h2>
                    </div>
                    <div class="appearing-part fourth">
                        <h2 class="appearing-text">  {{ content.text_fourth }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </section> 

</template>
