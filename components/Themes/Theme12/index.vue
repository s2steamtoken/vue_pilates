<script setup>

const globalData = inject('globalData')
const siteLang = inject('siteLang')
const translate = inject('translate')

</script>

<script>
export default {
    data(props) {
        return {
            zoomCoord: [],
            apiData: props.apiData,
            globalData: props.globalData,
            mapLoaded: false,
        }
    },
    props: {
        content: {},
        apiData: {},
        globalData: {},
    },
    mounted() {

        let scriptYandexMap = document.createElement('script');
        scriptYandexMap.setAttribute('src', this.globalData.map_url);
        document.head.appendChild(scriptYandexMap);

        scriptYandexMap.addEventListener("load", this.initializeYandexMap);
    },
    methods: {
        initializeYandexMap() {
            ymaps.ready(() => {
                this.mapLoaded = true;
            });
        },
        chooseShop: function (shop) {

            shop.active = true;

            for (let i in this.apiData.shops) {
                if (this.apiData.shops[i].id != shop.id) {
                    this.apiData.shops[i].active = false
                }
            }

            this.zoomCoord = shop.coordinates

            document.getElementById('mapElement').scrollIntoView({ behavior: 'smooth' });
        },
    }
};
</script>
<template>
    <section class="frequently-asked-question-page" id="faq">
        <div class="container new-container">
            <div class="main-part">
                <h2 class="frequently-asked-question-title">{{ content.title_text }}</h2>
                <p class="frequently-asked-text">{{ content.subtitle_text }}</p>
                <div class="accordion" id="accordionPanelsStayOpenExample" v-for="(item, bin) in content.appendtext">
                    <div class="accordion-item">
                        <h2 class="accordion-header" >
                            <button :class="`accordion-button collapsed`" type="button" data-bs-toggle="collapse"
                                :data-bs-target="`#block_${bin}`">
                                {{ item.question_text }}
                            </button>
                        </h2>
                        <div :id="`block_${bin}`" :class="`accordion-collapse collapse ${bin == 0 ? '' : ''} `"
                            aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                {{ item.answer_text }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>