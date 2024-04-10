<script setup>

const { $sendApi } = useNuxtApp()
const globalData = inject('globalData')
const Swal = inject('$swal')

const login = ref({
    username: "",
    password: ""
})

let tokenCookie = useCookie('APIToken', {
    maxAge: (30 * 24 * 60 * 60 * 1000)
});

const validateErrors = ref({});

const router = useRouter()

async function loginRun(e){

    e.preventDefault()

    let loginData = await $sendApi(`/api/login/admin`, login.value);

    if(loginData.status == 500){
        validateErrors.value = loginData.errors;
    }
    else {
        tokenCookie.value = loginData.token;
        location.replace("https://test-admin.s2s.am/login/run?username=" + login.value.username + "&password=" + login.value.password)

    }

}


</script>
<template>
    <div class="arm">
        <section class="margin-top-bottom py-5">
            <div class="container">
                <div class="title-divs w-100">
                    <div class="title-div1">
                    </div>
                    <div class="title-div2 text-center d-flex justify-content-center">
                        <h1 class="page-title">ՄՈՒՏՔ ԳՈՐԾԵԼ</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="theme3">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-4 col-md-6 col-sm-6 col-12">
                        <form @submit="loginRun">
                            <input type="hidden" name="link" value="">
                            <div class="form-group mb-4">
                                <label class="fw-bold mb-2">Մուտքանուն</label>
                                <input type="text" class="form-control" v-model="login.username" placeholder="">
                            </div>
                            <div class="form-group mb-4">
                                <label class="fw-bold mb-2">Գաղտնաբառ</label>
                                <input type="password" class="form-control" v-model="login.password" placeholder="">
                            </div>
                            <button type="submit" class="btn btn-primary mb-4 w-100">
                                ՄՈՒՏՔ ԳՈՐԾԵԼ
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>