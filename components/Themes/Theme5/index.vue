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
    <section class="runing-row-part">
        <div class="main-part">
            <div class="ticker-wrapper-h">
                <ul class="news-ticker-h" >
                    <li v-for="item in content.appendtext" >
                        <nuxt-link to="#">
                            {{ item.text }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </section> 
</template>
