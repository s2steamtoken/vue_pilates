<script setup>
const { $sendApi, $getImage, $clearFilter } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const Swal = inject('$swal')
const formData = ref({
    name:'',
    name_2:'',
    phone:'',
    email: '',
    comment:''

})
const validateErrors = ref({});
async function sendEmail(e) {
    e.preventDefault();
    let apiData = await $sendApi(`/api/forms/contact_us`, formData.value)
    if (apiData.status != 200) {
        validateErrors.value = apiData.errors;
        if (apiData.message != undefined) {
            Swal.fire({
                title: apiData.title,
                text: apiData.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
    else {
        validateErrors.value = {};
        Swal.fire({
            title: apiData.title,
            text: apiData.message,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
}
</script>
<script>
export default {
    props: {
        content: {},
        apiData: {},
    },
};
</script>
<template>
    <section class="about-us-start">
        <div class="container">
            <div class="row justify-content-between align-items-center flex-direction-reverse">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <form class="about-us-form" @submit="sendEmail" id="contact_subscribe_form">
                        <div class="form-group mt-4">
                            <label>{{ translate('Name') }}</label>
                            <input v-model="formData.name" type="text" class="form-control bg-gray-input" name="name">
                            <div class="invalid-feedback">{{ validateErrors.name }}</div>
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('Surname') }}</label>
                            <input v-model="formData.name_2" type="text" class="form-control bg-gray-input" name="lastname">
                            <div class="invalid-feedback">{{ validateErrors.name_2 }}</div>
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('E-mail') }}</label>
                            <input v-model="formData.email" type="text" class="form-control bg-gray-input" name="email">
                            <div class="invalid-feedback">{{ validateErrors.email }}</div>
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('Phone') }}</label>
                            <input v-model="formData.phone" type="text" class="form-control bg-gray-input" name="phone">
                            <div class="invalid-feedback">{{ validateErrors.phone }}</div>
                        </div>
                        <div class="form-group mt-4">
                            <label>{{ translate('Type Your Message') }}</label>
                            <textarea v-model="formData.comment"  class="form-control bg-gray-input" rows="3" placeholder="Type..."
                                name="message"></textarea>
                                <div class="invalid-feedback">{{ validateErrors.comment }}</div>
                        </div>
                        <div class="d-flex mt-4 justify-content-between flex-wrap">
                            <button class="btn-dark" type="submit">{{ translate('SEND MESSAGE') }}</button>
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
                        <div class="contact-info-text"  v-for="item in globalData.contacts.address">
                            <h5 class="address-contact"  v-if="item.address"> {{ item.address }}</h5>
                            <div class="d-flex mb-2 align-items-center grid-gap-part">
                                <div class="contact-info-icon">
                                    <img src="/images/call.svg" alt="">
                                </div>
                                <div class="contact-info-number"  v-for="item in globalData.contacts.phone">
                                    <a  v-if="item.phone" :href="`tel:${item.phone}`" class="number mr-2">
                                        {{  item.phone}}
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