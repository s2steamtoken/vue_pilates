<script setup>
const translate = inject('translate');
</script>
<script>
export default {
    props: {
        content: {},
        apiData: {},
        wishlistData: {},
    },
};
</script>
<template>
    <!-- <section class="special-programs" id="special-programs">
        <div class="container new-container">
            <div class="main-part">
                <h3 class="special-programs-title main-title">
                    {{ content.title_text }}               
                 </h3>
                <p class="special-programs-text main-subtitle">
                    {{ content.subtitle_text }}               
                 </p>
                <div class="bg-gray-part swiper bg-color">
                    <Swiper 
                            v-if="content.append_images.length != 0" ref="swiperVertival"
                            :modules="[SwiperPagination]" :direction="'horizontal'" :pagination="{
                                clickable: true,
                            }"
                            :slidesPerView="1" :spaceBetween="30"
                        grabCursor
                        class="slider_area_special">
                            <SwiperSlide class="single-product-part swiper-slide" v-for="item in content.append_images">
                                <div class="row justify-content-center align-items-center bg-color">
                                    <div class="col-lg-6 col-md-12 mb-mob">
                                        <div class="single_slider d-flex align-items-center">
                                            <div class="product-part">
                                                <div class="product-img-part">
                                                    <nuxt-img v-if="item.image" width="486" height="486" :src="item.image" class="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-12">
                                        <h5 class="special-program-title">{{ item.slider_title }}</h5>
                                        <p class="specia-program-text">
                                            {{ item.slider_text }}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                    </Swiper>
                    <div class="swiper-pagination">
                    </div>  
                </div>
            </div>
        </div>
    </section> -->

</template>