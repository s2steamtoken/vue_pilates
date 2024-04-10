<script setup>

const { $getImage, $sendApi } = useNuxtApp()
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
    <section class="my-account">
        <div class="container">
            <div class="row justify-content-between align-items-center mb-5 mob-justify-center">
                <AccountSidebar></AccountSidebar>
            </div>
            <div class="form mb-4">
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="your-opinion-inputs">
                            <input v-model="user.name" type="text"
                                :class="`form-control bg-gray-input ${validateErrors.name != undefined ? 'is-invalid' : ''}`"
                                placeholder="name">
                            <div class="invalid-feedback">{{ validateErrors.name }}</div>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="your-opinion-inputs">
                            <input v-model="user.lastname" type="text"
                                :class="`form-control bg-gray-input ${validateErrors.lastname != undefined ? 'is-invalid' : ''}`"
                                placeholder="Last name">
                            <div class="invalid-feedback">{{ validateErrors.lastname }}</div>
                        </div>
                    </div>
                    <div class="col-lg-12 mb-4">
                        <div class="your-opinion-inputs">
                            <input v-model="user.email" type="email"
                                :class="`form-control bg-gray-input ${validateErrors.email != undefined ? 'is-invalid' : ''}`"
                                name="email" placeholder="Email">
                            <div class="invalid-feedback">{{ validateErrors.email }}</div>
                        </div>
                    </div>
                    <div class="col-lg-12 mb-4">
                        <div class="your-opinion-inputs">
                            <input v-model="user.phone" type="number"
                                :class="`form-control bg-gray-input ${validateErrors.phone != undefined ? 'is-invalid' : ''} `"
                                name="number" placeholder="+374 99 76 87 68">
                            <div class="invalid-feedback">{{ validateErrors.phone }}</div>
                        </div>
                    </div>
                    <div class="text-center">
                        <button @click="userRun" class="btn-dark mt-3 w-100">
                            {{ translate('Save') }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="form">
                <div class="row">
                    <div class="col-lg-6 mb-4">
                        <div class="your-opinion-inputs">
                            <input v-model="password.current_password" type="password"
                                :class="`form-control bg-gray-input ${validateErrors.current_password != undefined ? 'is-invalid' : ''}`"
                                 placeholder="Password">
                            <div class="invalid-feedback">{{ validateErrors.current_password }}</div>
                        </div>
                    </div>
                    <div class="col-lg-6 mb-4">
                        <div class="your-opinion-inputs">
                            <input v-model="password.new_password" type="password"
                                :class="`form-control bg-gray-input ${validateErrors.new_password != undefined ? 'is-invalid' : ''}`"
                              placeholder="New Password">
                            <div class="invalid-feedback">{{ validateErrors.new_password }}</div>
                        </div>
                    </div>
                    <div class="col-lg-12 mb-4">
                        <div class="your-opinion-inputs">
                            <input v-model="password.repeat_password" type="password"
                                :class="`form-control bg-gray-input ${validateErrors.repeat_password  != undefined ? 'is-invalid' : ''}`"
                              placeholder="New Password">
                            <div class="invalid-feedback">{{ validateErrors.repeat_password }}</div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button @click="passwordRun" class="btn-dark mt-3 w-100">
                        {{ translate('Save') }}
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>