<script setup lang="ts">

const { $getImage, $sendApi } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const Swal = inject('$swal')
const $store = useNuxtApp()

const props = defineProps({
    userData: ref(),
    content: {},
    apiData: {},
    cartData: {},
    globalData: {},
});

const validateErrors = ref({});

const checkout = ref({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    count_id: "",
    package_id: props.apiData.package.id,
    payment_method: 'card'
});

const selectedPrice = ref(0)
for(let i in props.content.package_prices){
    let price_el = toRaw(props.content.package_prices[i]);
    selectedPrice.value = price_el.price;
    checkout.value.count_id = price_el.id;
    break;
}

function selectPrice(){
    for(let i in props.content.package_prices){
        let price_el = toRaw(props.content.package_prices[i]);
        console.log(price_el);
        if(price_el.id == checkout.value.count_id){
            selectedPrice.value = price_el.price;
        }
    }
}

async function orderRun(e) {

    e.preventDefault();

    let orderData = await $sendApi(`/api/forms/packages_buy`, checkout.value);

    if (orderData.status == 500) {
        if (orderData.errors != undefined) {
            validateErrors.value = orderData.errors;
        }

        if (orderData.message != undefined && orderData.message != "") {

            Swal.fire({
                title: (orderData.title != undefined && orderData.title != "") ? orderData.title : "",
                text: orderData.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

    }
    else {

        validateErrors.value = {}

        if (orderData.url != undefined && orderData.url != "") {
            location.replace(orderData.url);
        }
        else {

            Swal.fire({
                title: "Գրանցվել",
                text: 'dsfh',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            // router.push({
            //     path: '/my-orders',
            // });
            // order_id.value = orderData.order_id
            // openModal('orderPlaced')
        }
    }

}


</script>

<script lang="ts">

export default {
    props: ["content", "apiData"]
};

</script>

<template>
     <section class="packages-form-start general-class-all"  v-if="apiData.package != undefined" >
        <div class="main-part">
            <div class="row max-width-mob">
                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="first-part">
                        <form @submit="orderRun">
                            <h5 class="packages-form-title">{{ translate('Recipient details') }}</h5>
                            <div class="row mb-3">
                                <div class="col-lg-12 col-md-12 col-sm-6 col-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="checkout.name" type="text"
                                            :class="`form-control bg-gray-input  ${validateErrors.name != undefined ? 'is-invalid' : ''}`"
                                            placeholder="First name">
                                        <div class="invalid-feedback">{{ validateErrors.name }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 col-md-12 col-sm-6 col-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="checkout.lastname" type="text"
                                            :class="`form-control bg-gray-input  ${validateErrors.lastname != undefined ? 'is-invalid' : ''}`"
                                            placeholder="Last name">
                                        <div class="invalid-feedback">{{ validateErrors.lastname }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input  v-model="checkout.email" type="email" 
                                        :class="`form-control bg-gray-input  ${validateErrors.email != undefined ? 'is-invalid' : ''}`"
                                         placeholder="Email">
                                         <div class="invalid-feedback">{{ validateErrors.email }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="checkout.phone" type="number" 
                                        :class="`form-control bg-gray-input  ${validateErrors.phone != undefined ? 'is-invalid' : ''}`"
                                        placeholder="Phone number (required for shipping updates)">
                                        <div class="invalid-feedback">{{ validateErrors.phone }}</div>
                                    </div>
                                </div>
                                <!-- <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <select @change="selectPrice" v-model="checkout.count_id" :class="`form-control bg-gray-input ${validateErrors.count_id != undefined ? 'is-invalid' : ''}`" >
                                            <option v-for="item in content.package_prices" :value="item.id">{{ item.name }} ({{ item.price }}{{ globalData.currency }})</option>
                                        </select>
                                    </div>
                                </div> -->
                            </div>
                            <h5 class="packages-form-title">{{ translate('Payment details') }}</h5>
                            <div class="row  mb-4">
                                <template v-for="payment_method in apiData.payment_methods">
                                    <div v-if="payment_method.key != 'cash'" class="col-lg-6 margin-bottom-part">
                                        <div class="form-control d-flex grid-gap-part check-your-info check-payment">
                                            <label :for="`payment_${payment_method.key}`" class="label-d-flex">
                                                <input name="payment_method" v-model="checkout.payment_method"
                                                    type="radio" :id="`payment_${payment_method.key}`" :value="payment_method.key" />
                                                <span></span>
                                            </label>
                                            <div class="d-flex align-items-center grid-gap-part">
                                                {{ payment_method.name }}
                                                <nuxt-img :src="payment_method.icon" width="50" height="32" class="">
                                                </nuxt-img>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="check-your-info">
                                <label for="agreeterms">
                                    <input type="checkbox" id="agreeterms" name="agreeterms" />
                                    <span></span>
                                </label>
                                {{ translate('I agree with the provisions and conditions, privacy policy club regulations.') }}
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn-dark mt-3 w-100"><span>{{ translate('Pay Now') }}</span></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="second-part">
                        <div class="logo-image-part">
                            <nuxt-img src="/images/logoboutiqe.svg" width="295" height="106" alt="" class="boutique-logo"></nuxt-img>
                        </div>
                        <div class="col-lg-12">
                            <div class="your-opinion-inputs">
                                <!-- <select @change="selectPrice" v-model="checkout.count_id" :class="`form-control bg-gray-input ${validateErrors.count_id != undefined ? 'is-invalid' : ''}`" >
                                    <option v-for="item in content.package_prices" :value="item.id">{{ item.name }} ({{ item.price }}{{ globalData.currency }})</option>
                                </select> -->
                                <ul>
                                    <li class="category checkbox" v-for="item in content.package_prices">
                                        <div class="filter-checkbox check-your-info-sort">
                                            <input :id="item.id" type="radio"
                                            class="category-filter" :value="item.id" :name="`item_${item.id}`" 
                                            v-model="checkout.count_id" @change="selectPrice">
                                            <label :for="item.id">
                                                {{ item.name }} ({{ item.price }}{{ globalData.currency }})
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row justify-content-center packages-for-offer">
                            <div class="col-lg-8 col-md-11 col-sm-8 col-11">
                                <div class="single-part-packages bg-dark-after">
                                    <div class="padding-part">
                                        <div class="d-flex justify-content-center">
                                            <nuxt-link :to="`/${ apiData.package.url}`" class="btn-select">
                                                {{ translate('Selected Package') }}
                                            </nuxt-link>
                                        </div>
                                        <div class="info-part">
                                            <h3 class="packages-part-text">{{ globalData.currency }} 
                                                {{ selectedPrice }} 
                                                
                                                / {{ translate('year') }}  </h3>
                                            <div class="bg-color-info">
                                                <div class="d-flex justify-content-center">
                                                    <div class="img-part">
                                                        <nuxt-img src="/images/circlepink.svg" class="" width="13" height="13" altent="">
                                                        </nuxt-img>
                                                    </div>
                                                    <div class="text-part">
                                                        <h5 class="main-info-title">
                                                            {{ apiData.package.name }}
                                                        </h5>
                                                        <p class="text-part">
                                                            {{ apiData.package.text }}
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
            </div>
        </div>
    </section>
</template>