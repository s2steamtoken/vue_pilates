<script setup lang="ts">

const { $getImage } = useNuxtApp()
const globalData = inject('globalData')

</script>

<script lang="ts">
export default {
    props: ["content"]
};

</script>

<template>
    <section class="about-pillates padding-top-bottom" id="about">
        <div class="container new-container">
            <div class="main-part">
                <div class="d-flex align-items-center justify-content-between flex-wrap-mob">
                    <div class="image-part">
                        <nuxt-img :src="content.logoimage" width="249" height="92"></nuxt-img>
                    </div>
                    <p class="about-pilates-text">
                        {{ content.text }}
                    </p>
                </div>
                <div class="bg-image-part " :style="`background-image:url(${content.image})`">
                    <div class="mob-d-block">
                        <nuxt-img width="444" height="282" :src="content.mob_image" class="" />
                    </div>
                    <div class="row main-part-bg gx-0">
                            <div class="col-lg-4 single-part-main" v-for="item in content.appendimages" >
                                <div class="content-pillates">
                                    <div class="img-pillates">
                                        <nuxt-img  width="76" height="48" :src="item.light_image" class="mob-d-none" />
                                        <nuxt-img  width="76" height="48" :src="item.dark_image" class="mob-d-block" />
                                    </div>
                                    <h6 class="subtitle-pillates">
                                        {{ item.text }}                                    
                                    </h6>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
