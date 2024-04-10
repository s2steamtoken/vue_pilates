<script setup>

const { $getImage, $sendApi } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const addToCart = inject('addToCart')
const changeWishlist = inject('changeWishlist')
const openModal = inject('openModal')

const props = defineProps({
    content: ref(),
    apiData: ref(),
})
</script>
< script>
    export default {
    props: {
    content: {},
    apiData: {},
    },
    };
    <script />

    <template>
        <section class="coaches-banner-part" id="coaches">
            <div class="container">
                <div class="main-part">
                    <h2 class="coaches-banner-title main-title">{{ content.title }}</h2>
                    <h5 class="coaches-banner-subtitle main-subtitle">{{ content.subtitle }}</h5>
                    <div class="row grid-gap-mob" >
                        <div class="col-lg-3 col-md-6 col-sm-6 col-6" v-for="item in content.specialists">
                            <div class="main-img">
                                <nuxt-img v-if="item.image" width="382" height="382" :src="item.image" class="coach-img" />
                            </div>
                            <h5 class="coaches-banner-title">{{ item.name }}</h5>
                            <div class="coaches-banner-text" v-html="item.short_description"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </template>