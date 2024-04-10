// ("use strict");
const MEDIA_ARRAY = [0, 500, 768, 1024, 1440, 1920];
let HTML_FONT_SIZE = 16;
document.addEventListener('DOMContentLoaded', () => {
    change_font_size(HTML_FONT_SIZE, MEDIA_ARRAY);
    document.body.style.visibility = "visible";
    swiper();
});
window.addEventListener("resize", function () {
    change_font_size(HTML_FONT_SIZE, MEDIA_ARRAY);
    swiper();
});
function change_font_size_variable(media_start, media_next, font_size = 16) {
    const result = (media_next / media_start) * font_size;
    return result;
}
function check_media(media_array) {
    let result = 0;
    for (let index = 0; index < media_array.length; index++) {
        let last_media = media_array[media_array.length - 1];
        if (document.body.offsetWidth <= media_array[index]) {
            result = media_array[index];
            return result;
        }
        else if (document.body.offsetWidth > media_array[media_array.length - 1]) {
            result = last_media;
            return result;
        }
    }
    return result;
}
function calc_adaptation(font_size, media) {
    let result = font_size * (window.innerWidth / media);
    return result;
}
function change_font_size(font_size, media_array) {
    let media_font_size = (document.body.offsetWidth <= 500) ? change_font_size_variable(375, 500, font_size) : font_size;
    let set_font_size = calc_adaptation(media_font_size, check_media(media_array));
    document.documentElement.style.fontSize = `${set_font_size}px`;
}
function swiper() {
    let swiperProductContaier_array = document.querySelectorAll(".swiperProductContainer-js");
    swiperProductContaier_array.forEach(element => {
        let swiperProductGallery = element.querySelector(".swiperProductGallery");
        let pagination = element.querySelector(".swiper-pagination");
        let swiper = new Swiper(swiperProductGallery, {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            direction: "horizontal",
            pagination: {
                el: pagination,
            },
            breakpoints: {
                // when window width is >= 769px
                1025: {
                    direction: "vertical",
                },
            }
        });
        let swiperProduct = element.querySelector(".swiperProduct");
        let swiper2 = new Swiper(swiperProduct, {
            spaceBetween: 10,
            effect: "flip",
            grabCursor: true,
            thumbs: {
                swiper: swiper,
            },
        });
    });
    let swiperDoudle_array = document.querySelectorAll(".swiperDoudle-js");
    swiperDoudle_array.forEach(element => {
        let swiperDoudle = element.querySelector(".swiperDoudle");
        let prev = element.querySelector(".swiperBtn__prev");
        let next = element.querySelector(".swiperBtn__next");
        let swiper = new Swiper(swiperDoudle, {
            slidesPerView: 2,
            spaceBetween: 30,
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
        });
    });
    let galleryModalSwiper_array = document.querySelectorAll(".galleryModalSwiper-js");
    galleryModalSwiper_array.forEach(element => {
        let galleryModalSwiper = element.querySelector(".galleryModalSwiper");
        let prev = element.querySelector(".swiperBtn__prev");
        let next = element.querySelector(".swiperBtn__next");
        let swiper = new Swiper(galleryModalSwiper, {
            spaceBetween: 30,
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
        });
    });
    let aboutSlider = document.querySelectorAll(".aboutSlider");
    aboutSlider.forEach(element => {
        new Swiper(element, {
            slidesPerView: 2,
            spaceBetween: 30,
            autoplay: {
                delay: 3000,
                pauseOnMouseEnter: true,
            },
            breakpoints: {
                // when window width is >= 769px
                769: {
                    slidesPerView: 3,
                },
            }
        });
    });
}
