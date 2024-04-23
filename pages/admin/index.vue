<script setup>

const config = useRuntimeConfig();
const { $sendApi } = useNuxtApp()
const $store = useNuxtApp()
const globalData = inject('globalData')
const Swal = inject('$swal')

const login = ref({
    username: "",
    password: ""
})

const validateErrors = ref({});

const router = useRouter()

async function loginRun(e) {
    
    e.preventDefault()

    let loginData = await $sendApi(`/api/login/admin`, login.value);

    if (loginData.status == 500) {
        validateErrors.value = loginData.errors;
    }
    else {
        console.log(loginData);
        $store.sessionUpdate({ token: loginData.token })
        location.replace(config.public.apiBaseUrl + "login/run?username=" + login.value.username + "&password=" + login.value.password)
    }

}


</script>

<style>
* {
    font-family: "Poppins", sans-serif;
}

.s2s_admin_login {
    padding: 5em 0;
    position: relative;
}

.s2s_admin_login::before {
    position: absolute;
    z-index: 0;
    background-color: #36459A;
    content: "";
    min-height: 100%;
    width: 35vw;
    top: 0;
    right: 0;
}

@-webkit-keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    40% {
        -webkit-transform: translateY(-30px);
        transform: translateY(-30px);
    }

    60% {
        -webkit-transform: translateY(-15px);
        transform: translateY(-15px);
    }
}

@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
        transform: translateY(0);
    }

    40% {
        -webkit-transform: translateY(-30px);
        -ms-transform: translateY(-30px);
        transform: translateY(-30px);
    }

    60% {
        -webkit-transform: translateY(-15px);
        -ms-transform: translateY(-15px);
        transform: translateY(-15px);
    }
}


.s2s_admin_login .s2s-logo-part {
    width: 10em;
    margin-bottom: 2em;
    animation: bounce;
    animation-duration: 4s;
}


.s2s_admin_login .bg-white-admin {
    background-color: white;
    border-radius: 0.8em;
    padding: 1.5em;
}

.s2s_admin_login .title-part {
    margin-bottom: 2em;
}

.s2s_admin_login .s2s_admin_title {
    font-size: 1.5rem;
    font-weight: 600;
}

.s2s_admin_login label {
    font-weight: 500;
    font-size: 1rem;
}

.s2s_admin_login .form-control {

    min-height: 40px !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 0 !important;
    border-bottom: 1px solid #e7e7e7 !important;
    padding: 10px 30px 10px 0 !important;
    color: #111 !important;
    
    display: block !important;
    width: 100% !important;
    height: calc(2.25rem + 2px) !important;
    padding: 0.375rem 0.75rem !important;
    font-size: 1rem !important;
    line-height: 1.5 !important;
    color: #495057;
    background-color: #fff !important;
    background-clip: padding-box !important;
    border: 1px solid #ced4da !important;
    border-radius: 0.25rem !important;
    -webkit-transition: border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out !important;
    transition: border-color .15s ease-in-out, -webkit-box-shadow .15s ease-in-out !important;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out !important;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out, -webkit-box-shadow .15s ease-in-out !important;

}

.s2s_admin_login .btn-s2s-admin-login {
    background-color: #3c3d88;
    border-color: #3c3d88;
    cursor: pointer;
    display: inline-block;
    font-size: 1.1rem;
    font-weight: 500;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: none;
    border: 0;
    color: #fff;
    border-radius: 0.25em;
    padding: .8em 1em;
    margin-bottom: 0.625em;
    width: 100%;
    -webkit-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    font-weight: 600;
}

.s2s_admin_login .about-s2s {
    width: 100%;
    /* height: 63em; */
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100%;
    background-position: center center;
    padding: 12.25em 6.25em;
    position: relative;
}

.s2s_admin_login .about-s2s::after {
    content: "";
    left: 0;
    top: 20%;
    position: absolute;
    z-index: 1;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-left: 20px solid #fff;
    border-bottom: 15px solid transparent;
    animation-name: slideInLeft;
    animation-duration: 2s;
}

.s2s_admin_login .about-s2s-title {
    color: #fff;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2em;
}

@keyframes slideInLeft {
    0% {
        opacity: 0;
        -webkit-transform: translateX(-2000px);
        -ms-transform: translateX(-2000px);
        transform: translateX(-2000px);
    }

    100% {
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
    }
}

@-webkit-keyframes slideInRight {
    0% {
        opacity: 0;
        -webkit-transform: translateX(2000px);
        transform: translateX(2000px);
    }

    100% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    0% {
        opacity: 0;
        -webkit-transform: translateX(2000px);
        -ms-transform: translateX(2000px);
        transform: translateX(2000px);
    }

    100% {
        -webkit-transform: translateX(0);
        -ms-transform: translateX(0);
        transform: translateX(0);
    }
}

.s2s_admin_login .description-s2s {
    color: #fff;
    font-style: italic;
    -webkit-animation-name: slideInLeft;
    animation-name: slideInRight;
    animation-duration: 2s;
    font-size: 1.2rem;
    font-style: italic;
    line-height: 1.6;
}

.s2s_admin_container {
    max-width: 105rem;
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x)* 0.5);
    padding-left: calc(var(--bs-gutter-x)* 0.5);
    margin-right: auto;
    margin-left: auto;
}

@media(max-width:1440px) {
    .s2s_admin_login .about-s2s {
        padding: 6.25em 3.25em;
    }

    .s2s_admin_login .about-s2s-title {
        margin-bottom: 1em;
    }

    .s2s_admin_container {
        max-width: 86rem;
    }

}

@media(max-width:1024px) {
    .s2s_admin_login .about-s2s {
        padding: 3.25em 2.25em;
    }

    .s2s_admin_login .about-s2s-title {
        font-size: 2rem;
    }

    .s2s_admin_container {
        max-width: 63rem;
    }
}

@media(max-width:768px) {
    .s2s_admin_login::before {
        display: none;
    }

    .s2s_admin_login .flex-direction-media {
        flex-direction: column-reverse;
        grid-gap: 2em 0;
    }

    .s2s_admin_container {
        max-width: 62rem;
    }
}

@media(max-width:500px) {
    .s2s_admin_login .about-s2s {
        padding: 2.25em 1.25em;
    }
}
</style>
<template>
    <section class="s2s_admin_login">
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
        <div class="s2s_admin_container">
            <div class="row align-items-center flex-direction-media">
                <div class="col-lg-4 offset-1 col-md-6 col-sm-10 col-12 position-relative">
                    <div class="s2s-logo-part">
                        <img :src="`${config.public.apiBaseUrl}public_admin/img/logo.svg`">
                    </div>
                    <div class="bg-white-admin">
                        <div class="title-part">
                            <h1 class="s2s_admin_title">Login to system</h1>
                        </div>
                        <form @submit="loginRun">
                            <input type="hidden" name="link" value="">
                            <div class="form-group mb-4">
                                <label class="mb-2">Username</label>
                                <input type="text" class="form-control" v-model="login.username" placeholder="">
                                <SPAN>{{ validateErrors.username }}</SPAN>
                            </div>
                            <div class="form-group mb-4">
                                <label class="mb-2">Password</label>
                                <input type="password" class="form-control" v-model="login.password" placeholder="">
                            </div>
                            <button type="submit" class="btn-s2s-admin-login">
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
                <div class="col-lg-7 col-md-6 col-sm-10 col-12 position-relative">
                    <div class="about-s2s" :style="`background-image: url(${config.public.apiBaseUrl}public_admin/img/s2sadminimg.svg)`">
                        <div class="about-s2s-title-part">
                            <h2 class="about-s2s-title">Welcome to S2S System</h2>
                        </div>
                        <div class="about-s2s-title-description">
                            <h4 class="description-s2s">“Time is an equal opportunity employer. Each human being has
                                exactly the same number of
                                hours and minutes every day. Rich people can't buy more hours. Scientists can't invent
                                new minutes. And you can't save time to spend it on another day. Even so, time is
                                amazingly fair and forgiving. No matter how much time you've wasted in the past, you
                                still have an entire tomorrow.”</h4>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>