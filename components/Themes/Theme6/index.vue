<script setup lang="ts">

const { $getImage } = useNuxtApp()
// const globalData = inject('globalData')
const translate = inject('translate')
const isOpenMobileCategories = ref(false)
const Swal = inject('$swal')


function openMobileCategories(){
    isOpenMobileCategories.value = true
}

function closeMobileCategories(){
    isOpenMobileCategories.value = false
}

</script>

<script lang="ts">
export default {
    props: ["content", "apiData", "globalData"]
};

</script>

<template>
<section class="packages-part-start" id="packages">
    <div class="container">
        <div class="main-part">
            <h2 class="packages-part-title main-title">
                {{ content.title }}           
             </h2>
            <h5 class="packages-subtitle main-subtitle">{{ content.subtitle }}</h5>
            <div class="row justify-content-mob">
                <div class="col-lg-4 col-md-6 col-sm-8 col-10 single-part-packages" v-for="item in content.packages">
                    <div class="single-packages-hover">
                        <nuxt-link :to="`/${item.url}`">
                            <div class="frontofcard">
                                <nuxt-img :src="item.image" width="517" height="476" class="shown shown-img"></nuxt-img>
                                <h3 class="packages-part-text shown">{{ item.name }}</h3>
                            </div>
                            <div class="backofcard">
                                <h3 class="packages-part-text hidden"> {{ globalData.currency }} {{ item.price }} / {{ translate('year') }}</h3>
                                <nuxt-img :src="item.hover_image" width="517" height="476" class="hidden hidden-img"></nuxt-img>
                                <div class="info-part">
                                    <div class="d-flex align-items-baseline">
                                        <div class="list-img">
                                            <nuxt-img src="/images/circlepink.svg" width="18" height="18" alt=""></nuxt-img>
                                        </div>
                                        <h5 class="main-info-title">
                                            {{ item.name }}
                                        </h5>
                                    </div>
                                    <p class="text-part">
                                        {{ item.text }}
                                    </p>
                                </div>
                            </div> 
                            <div class="bg-dark-part"></div>
                        </nuxt-link>
                    </div>
                </div> 
            </div>
            <div class="d-flex align-items-center justify-content-center grid-gap-buttons btn-primary-hover mob-d-none mt-5">
                    <nuxt-link :to="`/${content.link.url}`" class="btn-primary">
                        {{ content.link.name }}
                    </nuxt-link>
                    <nuxt-link :to="`/${content.link.url}`"  class="btn-arrow">
                        <nuxt-img :src="content.arrowimage" width="12" height="12"></nuxt-img>
                    </nuxt-link>
            </div>
        </div>
    </div>
</section> 
  
</template>



