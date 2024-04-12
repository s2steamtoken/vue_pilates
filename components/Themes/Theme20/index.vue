<script setup>

const { $getImage, $sendApi } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const Swal = inject('$swal')
const $store = useNuxtApp()

let tokenCookie = useCookie('APIToken', {
    maxAge: (30 * 24 * 60 * 60 * 1000)
});

const validateErrors = ref({});

const login = ref({
    email: "",
    password: "",
});
const forgetpassword = ref({
    email: "",
    
});

const router = useRouter()

async function loginRun(e){

    e.preventDefault()

    let loginData = await $sendApi(`/api/login/run`, login.value);

    if(loginData.status == 500){
        validateErrors.value = loginData.errors;
    }
    else {
        $store.sessionUpdate({ token: loginData.token })

        router.push({
            path: '/' + globalData.langUrl + 'my-account',
        })
    }

}

async function forgetPassword(e){

    e.preventDefault()

    let loginData = await $sendApi(`api/user/forgetPassword `, forgetpassword.value);

    if(forgetpassword.status == 500){
        validateErrors.value = forgetpassword.errors;
    }
    else {
        router.push({
            path: '/' + globalData.langUrl + 'forget-password',
        })
    }

}

const validateUserErrors = ref({});

const step = ref(1)

const user = ref({
    name: "",
    lastname: "",
    phone: "",
    date_of_birth: "",
    email: "",
    password: "",
    repeat_password: "",
    code: ""
})

async function addUser(event){

    event.preventDefault();

    let userData = await $sendApi(`/api/user/add`, user.value);

    if(userData.status != 200){
        validateUserErrors.value = userData.errors;

        if(userData.message != undefined){
            Swal.fire({
                title: userData.title,
                text: userData.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });

        }

    }
    else {

        if(userData.sent_code != undefined){
            step.value = 2
        }
        else {
            
            $store.sessionUpdate({ token: userData.token })
            router.push({
                path: '/' + globalData.langUrl + 'my-account',
            })
        }

    }


}

const isMenuActive = ref(false)
function openMenu() {
    isMenuActive.value = !isMenuActive.value
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
     <section class="signin-signup">
        <div class="row max-width-mob">
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 bg-pink-light">
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
                    <div class="row gx-0">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                            <h2 class="signin-title">{{ translate('Sign In') }}</h2>
                            <p class="signin-text">{{ translate('Enter your details to create a Pilates account.') }}</p>
                            <form @submit="loginRun">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3 p-0">
                                        <div class="your-opinion-inpemailForm">
                                                <div class="invalid-feedbackuts">
                                            <input type="email" :class="`form-control bg-gray-input required-input ${validateErrors.email != undefined ? 'is-invalid' : ''}`"
                                                name="email" id="" placeholder="Email or Phone Number" v-model="login.email">{{ validateErrors.email }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3 p-0">
                                        <div class="your-opinion-inputs">
                                            <input type="password" :class="`form-control bg-gray-input required-input ${validateErrors.email != undefined ? 'is-invalid' : ''}`"
                                                name="password" id="passwordForm" placeholder="Password"
                                                v-model="login.password">
                                                <div>{{ validateErrors.password }}</div>
                                            <div class="text-end">
                                                <nuxt-link  :to="`/${globalData.langUrl}forgot-password`" class="forgot-your-password">{{ translate('Forgot your password?') }}</nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" class="btn-dark w-100">{{ translate('Sign In') }}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                <div class="row w-100 background-white-part justify-content-center">
                    <div class="col-lg-10 col-md-12 col-sm-10 col-11">
                        <h2 class="signin-title">{{ translate('Sign Up') }}</h2>
                        <p class="signin-text sign-up-text">{{ translate('Enter your details to create a Pilates account') }}</p>
                        <p class="signin-text sign-up-next">{{ translate('To confirm the registration, enter the code sent to your phone number') }}</p>
                        <form @submit="addUser">
                            <div v-if="step == 1">
                                <div class="row sign-up-register shown">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                        <div class="your-opinion-inputs">
                                            <input type="text" :class="`form-control bg-gray-input required-input ${validateErrors.name != undefined ? 'is-invalid' : ''}`" id="nameForm"
                                                name="name" placeholder="First name" required="" v-model="user.name">
                                                <div class="invalid-feedback">{{ validateUserErrors.name }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                        <div class="your-opinion-inputs">
                                            <input type="text" :class="`form-control bg-gray-input required-input ${validateErrors.lastname != undefined ? 'is-invalid' : ''}`"
                                                id="lastnameForm" name="lsatname" placeholder="Last name" required=""  v-model="user.lastname">
                                                <div class="invalid-feedback">{{ validateUserErrors.lastname }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="your-opinion-inputs">
                                            <input type="email" :class="`form-control bg-gray-input required-input ${validateErrors.email != undefined ? 'is-invalid' : ''}`" name="email"
                                                id="emailForm" placeholder="Email" required=""  v-model="user.email">
                                                <div class="invalid-feedback">{{ validateUserErrors.email }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12  col-md-12 col-sm-12 col-12 mb-3">
                                        <div class="your-opinion-inputs">
                                            <input type="number" :class="`form-control bg-gray-input required-input ${validateErrors.phone != undefined ? 'is-invalid' : ''}`" name="phone"
                                                id="phoneForm" placeholder="Phone number (required for shipping updates)"
                                                required=""  v-model="user.phone">
                                                <div class="invalid-feedback">{{ validateUserErrors.phone }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                        <div class="your-opinion-inputs">
                                            <input type="password" :class="`form-control bg-gray-input required-input ${validateErrors.password != undefined ? 'is-invalid' : ''}`"
                                                name="password" id="passwordForm" placeholder="Password" required=""  v-model="user.password">
                                                <div class="invalid-feedback">{{ validateUserErrors.password }}</div>

                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                        <div class="your-opinion-inputs">
                                            <input type="password" :class="`form-control bg-gray-input required-input ${validateErrors.repeat_password != undefined ? 'is-invalid' : ''}`"
                                                name="password" id="passwordForm" placeholder="Confirm Password" required="" v-model="user.repeat_password">
                                                <div class="invalid-feedback">{{ validateUserErrors.repeat_password }}</div>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <button type="submit" class="btn-dark show-hide w-100">{{ translate('Next') }}</button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="step == 2">
                                <div class="row">
                                    <div class="form-group">
                                        <label><span class="label-span mb-2">{{ translate('A confirmation code has been sent to your email account') }}</span></label>
                                        <input v-model="user.code" type="text" :class="`form-control bg-gray-input mt-2 ${validateUserErrors.code != undefined ? 'is-invalid' : ''}`">
                                        <div class="invalid-feedback">{{ validateUserErrors.code }}</div>
                                    </div>
                                </div>
                                <div class="text-center mt-4">
                                    <button :disabled="user.code.length < 6" type="submit" class="btn-secondary">
                                        {{ translate('Register') }}
                                    </button>
                                </div>
                            </div>
                         </form>
                    </div>
                </div>
            </div>
        </div>
    </section> 

</template>