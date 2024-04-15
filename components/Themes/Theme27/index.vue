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
    else if (result.status == 201) {

        console.log(forgetpass.value.code);
        if (forgetpass.value.code != "") {
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
    <section class="about-us-start">
        <div class="container">
            <div class="row justify-content-between align-items-center flex-direction-reverse">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <form class="about-us-form">
                        <div class="form-group mt-4">
                            <label>{{ translate('Name') }}</label>
                            <input required="" type="text" class="form-control bg-gray-input" name="name">
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('Surname') }}</label>
                            <input required="" type="text" class="form-control bg-gray-input" name="lastname">
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('E-mail') }}</label>
                            <input required="" type="text" class="form-control bg-gray-input" name="email">
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('Phone') }}</label>
                            <input required="" type="text" class="form-control bg-gray-input" name="phone">
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('Type Your Message') }}</label>
                            <textarea required="" class="form-control bg-gray-input" rows="3" placeholder="Type..."
                                name="message"></textarea>
                        </div>
                        <div class="d-flex mt-4 justify-content-between flex-wrap">
                            <button class="btn-dark">{{ translate('SEND MESSAGE') }}</button>
                        </div>
                    </form>
                </div>
                <div class="col-lg-5 col-md-5 col-sm-5 mt-3 m-auto">
                    <div class="contact-info-div">
                        <div class="contact-title">
                            <h2 class="main-subtitle">
                                {{ content.title }}
                            </h2>
                        </div>
                        <div class="contact-info-text">
                            <h5 class="address-contact">Hanrapetutyan Hraparak</h5>
                            <div class="d-flex mb-2 align-items-center grid-gap-part">
                                <div class="contact-info-icon">
                                    <img src="/images/call.svg" alt="">
                                </div>
                                <div class="contact-info-number">
                                    <a href="tel:+1(999)999-99-99" class="number">
                                        +1(999)999-99-99
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="contact-info-text">

                            <h5 class="address-contact">Hanrapetutyan Hraparak</h5>
                    
                            <div class="d-flex mb-2 align-items-center grid-gap-part">
                                <div class="contact-info-icon">
                                    <img src="/images/call.svg" alt="">
                                </div>
                                <div class="contact-info-number">
                                    <a href="tel:+1(999)999-99-99" class="number">
                                        +1(999)999-99-99
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>