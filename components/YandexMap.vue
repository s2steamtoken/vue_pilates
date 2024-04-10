<script>
export default {
    props: ["zoomCoord", "coordinateList"],
    data(props) {
        return {
            coordinateList: props.coordinateList,
            zoomCoord: props.zoomCoord,
            map: null,
            init: function(coordinateList){

                let mapElement = this.$refs.mapElement;

                coordinateList = toRaw(coordinateList);

                let center = coordinateList[0].coordinates

                let map = new ymaps.Map(mapElement, {
                    center: center,
                    zoom: 17,
                });

                for (let i = 0; i < coordinateList.length; i++) {

                    let coordinates = coordinateList[i].coordinates
                    if(coordinates.length != 2) continue;

                    var placemark = new ymaps.Placemark(coordinates, {
                        balloonContent: `<span class="shop-map-tooltip">
                            <i class="fa fa-map-marker-alt pink"></i>
                            ${coordinateList[i].name}
                            ${coordinateList[i].address}
                        </span>`
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '/images/map-icon.svg',
                        iconImageSize: [30, 46],
                        iconImageOffset: [-14, -5],
                        balloonPanelMaxMapArea: 0
                    });

                    map.geoObjects.add(placemark);
                }

                this.map = map
            },
            zoom: function(coord) {
                this.map.setCenter(coord);
                this.map.setZoom(18);
                
                this.map.container.fitToViewport();

            }
        };
    },
    computed: {
        computedData() {
            return this.zoom();
        }
    },
    mounted() {

        let coordinateList = this.coordinateList;
        ymaps.ready(this.init(coordinateList));

    },
    watch: {
        zoomCoord: {
            handler(newValue) {
                this.zoom(Object.values(toRaw(newValue)))
            },
        }
    }
};
</script>
<template>
    <div ref="mapElement" class="yandex-map" id="yandex-map"></div>
</template>