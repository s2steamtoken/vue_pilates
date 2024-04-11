<script setup>

const { $getImage, $sendApi } = useNuxtApp()
// const globalData = inject('globalData')
const translate = inject('translate')
const Swal = inject('$swal')

const props = defineProps({
    userData: ref(),
    content: {},
    apiData: {},
    cartData: {},
    globalData: {},
});

const userData = props.userData;

const user = ref({
    name: userData.name,
    lastname: userData.lastname,
    email: userData.email,
    phone: userData.phone,
    date_of_birth: userData.date_of_birth,
});

const validateErrors = ref({});

async function userRun() {

    let userData = await $sendApi(`/api/user/edit`, user.value);

    if (userData.status == 500) {
        validateErrors.value = userData.errors;
    }
    else {

        validateErrors.value = {};

        Swal.fire({
            title: userData.title,
            text: userData.message,
            icon: 'success',
            confirmButtonText: 'OK'
        });

        console.log(userData.data);
    }

}

const password = ref({
    current_password: "",
    new_password: "",
    repeat_password: "",
});

async function passwordRun() {

    let userData = await $sendApi(`/api/user/editPassword`, password.value);

    if (userData.status == 500) {
        validateErrors.value = userData.errors;
    }
    else {

        validateErrors.value = {};

        Swal.fire({
            title: userData.title,
            text: userData.message,
            icon: 'success',
            confirmButtonText: 'OK'
        });

    }

}

</script>


<template>
     <section class="packages-for-offer">
        <div class="container">
            <div class="main-part">
               <h3 class="special-programs-title main-title">
                    {{ content.title }}
                </h3>
                <p class="special-programs-text main-subtitle">
                    {{ content.subtitle }}
                </p>
                <div class="row justify-content-between grid-gap-mob">
                    <div class="col-lg-4 col-md-6 col-sm-8 col-12"  v-for="item in content.packages">
                        <div class="single-part-packages bg-dark-after">
                            <div class="padding-part">
                                <div class="d-flex justify-content-center">
                                    <nuxt-link :to="`/${item.url}`" class="btn-select">
                                        {{ item.id == apiData.package.id ? translate('Selected Package') : translate('Selected Package') }}
                                    </nuxt-link>
                                </div>
                                <div class="info-part">
                                    <h3 class="packages-part-text"> {{ globalData.currency }} {{ item.price }} / {{ translate('year') }}</h3>
                                    <div class="bg-color-info">
                                        <div class="d-flex justify-content-center">
                                            <div class="img-part">
                                                <nuxt-img src="/images/circlepink.svg" class="" width="13" height="13" altent=""></nuxt-img>
                                            </div>
                                            <div class="text-part">
                                                <h5 class="main-info-title">
                                                    {{ item.title }}
                                                </h5>
                                                <p class="text-part">
                                                    {{ item.text }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>