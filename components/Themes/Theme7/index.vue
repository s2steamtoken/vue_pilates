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
    <section class="star-products-part" id="machines">
        <div class="main-part">
            <div class="container">
                <h2 class="main-title">{{ content.title_text }}</h2>
                <h3 class="star-products-subtitle main-subtitle">{{ content.subtitle_text }}</h3>
                <div class="bg-gray-sytart">
                    <div class="row align-items-center flex-direction-mob">
                        <div class="col-lg-6 col-md-12 col-sm-12 mb-mob">
                            <h5 class="star-products-title">
                                {{ content.slider_title }}
                            </h5>
                            <p class="star-products-text">
                                {{ content.slider_text }}
                            </p>
                        </div>
                        <div class="col-lg-6 col-md-12 col-sm-12">

                                <Swiper 
                                        v-if="content.appendimages.length != 0" 
                                        @slide-change="activeSlide" ref="swiperVertival"
                                        :modules="[SwiperPagination]" :direction="'horizontal'" :pagination="{
                                            clickable: true,
                                        }"
                                        :slidesPerView="1" :spaceBetween="30"
                                    grabCursor
                                    class="slider-bg-rose">
                                    <SwiperSlide class="slider_area swiper-wrapper" v-for="item in content.appendimages">
                                        <div class="single-product-part swiper-slide">
                                            <div class="single_slider d-flex align-items-center justify-content-center">
                                                <div class="product-part">
                                                    <div class="product-img-part">
                                                        <nuxt-img v-if="item.image" width="486" height="486"
                                                            :src="item.image" class="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                                <div class="swiper-pagination">
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>




