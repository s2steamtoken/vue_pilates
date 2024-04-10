import Swal from 'sweetalert2'

// export default defineNuxtPlugin((nuxtApp) => {
// //     nuxtApp.provide('swal', Swal)
// // });

const options = {
    reverseButtons: true,
    confirmButtonText: "confirmText",
    cancelButtonText: "cancelText",
    confirmButtonColor: "#c78380",
}
const $swal = {
    install: (Vue, options) => {
        Vue.provide("$swal", Swal.mixin(options));
    },
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use($swal, options);
    // nuxtApp.provide('swal', $swal)
});

// const $swal = {
//     install: (Vue, options) => {
//         Vue.config.globalProperties.$swal = Swal.mixin(options);
//     },
// }

// export default defineNuxtPlugin((nuxtApp) => {
//     nuxtApp.vueApp.use($swal, {
//         reverseButtons: true,
//         confirmButtonText: "confirmText",
//         cancelButtonText: "cancelText",
//         confirmButtonColor: "#84bd00",
//     });
// }