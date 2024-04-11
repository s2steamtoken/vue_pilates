<script setup>

const globalData = inject('globalData')
const siteLang = inject('siteLang')
const translate = inject('translate')

</script>
<script>
export default {
    props: {
        content: {},
        apiData: {},
        globalData: {},
    }
};
</script>
<template>
 <section class="regulation-start-part" id="regulations">
        <div class="container">
            <div class="main-part">
                <h2 class="regulation-start-part-title main-title">{{ content.title_text }}</h2>
                <p class="regulation-start-part-text main-subtitle">{{ content.subtitle_text }}</p>
                <div class="d-grid main-info-grid-part">


                    <div class="single-info" v-for="(item, bin) in  content.appendimages ">
                        <div class="d-flex align-items-center grid-space">
                            <div class="img-part">
                                <div class="img-div">
                                    <nuxt-img v-if=" item.image " width="136" height="136" :src=" item.image " class="" />
                                </div>
                                <h4 class="regulation-list-number"> 0{{bin}}
                                </h4>
                            </div>
                            <div class="text-part">
                                <p class="regulation-start-text">
                                    {{ item.appendtext }}
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
 </section> 
</template>