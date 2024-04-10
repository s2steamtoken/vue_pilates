<script setup>

const { $getImage, $sendApi } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const Swal = inject('$swal')
const $store = useNuxtApp()

const validateErrors = ref({});

const forgetpass = ref({
    email: "",
    code: "",
    password: "",
    repeat_password: ""
});

const router = useRouter()

const step = ref(1)

async function forgetPassword(e) {

    e.preventDefault()

    let result = await $sendApi(`api/user/forgetPassword `, forgetpass.value);

    if (result.status == 500) {

        if (result.message != undefined) {
            Swal.fire({
                title: "Error",
                text: result.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });

        }

    }
    else if(result.status == 201) {

        console.log(forgetpass.value.code);
        if(forgetpass.value.code != ""){
            step.value = 3;
        }
        else {
            step.value = 2
        }
    }
    else {

        Swal.fire({
            title: "Success",
            text: result.message,
            icon: 'success',
            confirmButtonText: 'OK'
        });



        router.push({
            path: '/' + globalData.langUrl + 'sign-in',
        })
    }
    // else if(result.status == 201) {
    // }
    // else {
    //     step.value == 3
    //     router.push({
    //         path: '/' + globalData.langUrl + 'forget-password',
    //     })
    // }

}

</script>

<script>
export default {
    props: {
        content: {},
        apiData: {},
        cartData: {},
        globalData: {},
    },
};

</script>
<template>
    <section class="signin-signup forgot-password">
        <div class="row justify-content-center max-width-mob">
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="signin-main-part">
                    <div class="d-flex align-items-center grid-gap-link-text">
                        <nuxt-link :to="`/${globalData.langUrl}`" class="add-to-basket">
                            <nuxt-img src="/images/bag.svg" class="" width="24" height="24"></nuxt-img>
                        </nuxt-link>
                        <nuxt-link :to="`/${globalData.langUrl}`" class="back-link">
                            {{ translate('Back') }}
                        </nuxt-link>
                        <nuxt-link class="img-part" :to="`/${globalData.langUrl}`">
                            <nuxt-img src="/images/logopilatesboutique.svg" width="259" height="93"></nuxt-img>
                        </nuxt-link>
                    </div>
                    <h2 class="signin-title" v-if="step == 1">{{ translate('Forgot your password?') }}</h2>
                    <h2 class="signin-title" v-if="step == 2">{{ translate('Complete numbers') }}</h2>
                    <h2 class="signin-title" v-if="step == 3">{{ translate('Choose password') }}</h2>
                    <p class="signin-text"   v-if="step == 1">{{ translate('Enter your email') }}</p>
                    <p class="signin-text"   v-if="step == 2">{{ translate('Enter 5 digit numbers') }}</p>
                    <p class="signin-text"   v-if="step == 3">{{ translate('Enter your new password') }}</p>
                    <form @submit="forgetPassword">
                        <div class="row">
                            <div
                                v-if="step == 1"
                                :class="`col-lg-12 col-md-12 col-sm-12 col-12 mb-3 p-0 form-password-forgot`">
                                <input type="email" class="form-control bg-gray-input mb-3" name="email" id="" placeholder="Email" v-model="forgetpass.email">

                                <button type="submit" class="btn-dark w-100" :disabled="!forgetpass.email">{{ translate('Continue') }}</button>
                            </div>
                            <div
                                v-if="step == 2"
                                :class="`col-lg-12 col-md-12 col-sm-12 col-12 mb-3 p-0  digit-numbers`">
                                <input type="number" name="number" id="" placeholder="5 digit numbers"
                                    class="form-control bg-gray-input mb-3" v-model="forgetpass.code">
                                <button type="submit" class="btn-dark w-100">{{ translate('Continue') }}</button>
                            </div>
                            <div
                                v-if="step == 3"
                                :class="`col-lg-12 col-md-12 col-sm-12 col-12 mb-3 p-0  digit-numbers`">
                                <input type="password" name="password" id="" placeholder="Password"
                                    class="form-control bg-gray-input mb-3" v-model="forgetpass.password">
                                <input type="password" name="repeat-password" id="" placeholder="Repeat Password"
                                    class="form-control bg-gray-input mb-3" v-model="forgetpass.repeat_password">
                                <button type="submit" class="btn-dark w-100">{{ translate('Continue') }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>