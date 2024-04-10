<template>
    <div :class="`${pageLoad ? '' : 'invisible'}  min-h-screen text-default overflow-x-hidden`">
        <NuxtPage :appMedia="MediaIndex" />
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            mediaArray: [0, 500, 768, 1024, 1440, 1920],
            htmlFontSize: 16,
            set_font_size: 0,
            MediaIndex: 1920,
            pageLoad: false,
        };
    },
    mounted() {
        this.change_font_size(
            window.innerWidth,
            Number(this.changeMedia(window.innerWidth))
        );
        this.pageLoad = true;

        window.addEventListener("resize", () => {
            this.change_font_size(
                window.innerWidth,
                Number(this.changeMedia(window.innerWidth))
            );

            console.log(window.innerWidth);
        });
    },
    methods: {
        change_font_size(bodyWidth: number, myMedia: number) {
            this.MediaIndex = myMedia;

            this.set_font_size = this.htmlFontSize * (bodyWidth / myMedia);

            document.documentElement.style.fontSize = `${this.set_font_size}px`;
        },
        changeMedia(bodyWidth: number) {
            for (let index = 0; index < this.mediaArray.length; index++) {
                if (bodyWidth <= this.mediaArray[index]) {
                    return this.mediaArray[index];
                } else if (bodyWidth > this.mediaArray[this.mediaArray.length - 1]) {
                    return this.mediaArray[this.mediaArray.length - 1];
                }
            }
        },
    },
};
</script>
