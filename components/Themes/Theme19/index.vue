<script setup>

const { $getImage, $sendApi } = useNuxtApp()
// const globalData = inject('globalData')
const translate = inject('translate')
const deleteCart = inject('deleteCart')
const replaceCart = inject('replaceCart')
const validate = inject('validate')
const Swal = inject('$swal')
const openModal = inject('openModal')
const router = useRouter()

const props = defineProps({
    userData: ref(),
    content: {},
    apiData: {},
    cartData: {},
    globalData: {},
});

const userData = props.userData;
const apiData = props.apiData;

const validateErrors = ref({});

const checkout = ref({
    cart_comment: {},
    is_delivery: 0,
    delivery_type: '',
    shop_id: '',
    payment_method: 'card',
    billing_name: '',
    billing_lastname: '',
    billing_address: '',
    billing_building: '',
    billing_apartment: '',
    billing_entrance: '',
    billing_floor: '',
    billing_email: '',
    billing_phone: '',
    comment: '',
});

function changeDefaultAddress(address){
    
    for(let i in apiData.addresses){
        apiData.addresses[i].selected = 0
    }

    address.selected = 1

    checkout.value.billing_address = address.address
    checkout.value.billing_building = address.building
    checkout.value.billing_apartment = address.apartment
    checkout.value.billing_entrance = address.entrance
    checkout.value.billing_floor = address.floor
}

if(userData.isLogin){

    checkout.value.billing_name = userData.name
    checkout.value.billing_lastname = userData.lastname
    checkout.value.billing_email = userData.email
    checkout.value.billing_phone = userData.phone

    if(apiData.addresses.length > 0){
        for(let i in apiData.addresses){
            if(apiData.addresses[i].selected == 1){
                changeDefaultAddress(apiData.addresses[i])
            }
        }
    }

}

const emit = defineEmits(['update:apiData', 'update:cartData']);

async function loadData(){

    let newApiData = await $fetch(`/api/cart/checkout`, {
        method: 'POST',
        body: checkout.value,
        headers: useRequestHeaders(['cookie']) 
    });

    for(let key in newApiData){
        apiData[key] = newApiData[key];
    }
    
    replaceCart(newApiData.cart)

    // emit('update:apiData', newApiData.checkout);
    
}

const order_id = ref(0);

async function orderRun(e){

    e.preventDefault();

    let orderData = await $sendApi(`/api/order/add`, checkout.value);

    if(orderData.status == 500){
        if(orderData.errors != undefined){
            validateErrors.value = orderData.errors;
        }

        if(orderData.message != undefined && orderData.message != ""){

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

        if(orderData.url != undefined && orderData.url != ""){
            location.replace(orderData.url);
        }
        else {
            router.push({
                path: '/my-orders',
            });
            // order_id.value = orderData.order_id
            // openModal('orderPlaced')
        }
    }

}

loadData()

</script>

<script>
export default {
    props: {
        content: {},
        apiData: {},
        cartData: {},
        userData: {},
    },
    emits: ["update:apiData", "update:cartData"],
};

</script>

<template>
   <section class="checkout-pilates general-class-all" v-if="cartData.list.length > 0">
        <div class="main-part">
            <div class="row flex-direction-mob">
                <div class="col-lg-6 col-md-6">
                    <div class="first-part">
                        <div class="row align-items-center grid-gap-part">
                            <div class="col-lg-3 col-md-4 col-sm-4 col-3">
                                <div class="d-flex align-items-center grid-gap-back">
                                    <nuxt-link  :to="`/${globalData.langUrl}shop`" class="add-to-basket">
                                        <nuxt-img src="/images/bag.svg" class="" width="24" height="24">
                                        </nuxt-img>
                                    </nuxt-link>
                                    <nuxt-link  :to="`/${globalData.langUrl}`" class="back-link-part">
                                        {{ translate('Back') }}
                                    </nuxt-link>
                                </div>
                            </div>
                            <div class="col-auto">
                                <nuxt-link  :to="`/${globalData.langUrl}`" class="img-part">
                                    <nuxt-img src="/images/logopilatesboutique.svg" width="259" height="93">
                                    </nuxt-img>
                                </nuxt-link>
                            </div>
                        </div>
                        <form @submit="orderRun">
                            <h5 class="packages-form-title">{{ translate('Recipient details') }}</h5>
                            <div class="row mb-3">
                                <div class="col-lg-6 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="checkout.billing_name" type="text"
                                            :class="`form-control bg-gray-input required-input  ${validateErrors.billing_name != undefined ? 'is-invalid' : ''}`"
                                            placeholder="First name">
                                        <div class="invalid-feedback">{{ validateErrors.billing_name }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-6 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="checkout.billing_lastname" type="text"
                                            :class="`form-control bg-gray-input required-input ${validateErrors.billing_lastname != undefined ? 'is-invalid' : ''}`"
                                            placeholder="Last name">
                                        <div class="invalid-feedback">{{ validateErrors.billing_lastname }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="checkout.billing_email" type="email"
                                            :class="`form-control bg-gray-input required-input ${validateErrors.billing_email != undefined ? 'is-invalid' : ''}`"
                                            placeholder="Email">
                                        <div class="invalid-feedback">{{ validateErrors.billing_email }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="checkout.billing_phone" type="number"
                                            :class="`form-control bg-gray-input required-input ${validateErrors.billing_phone != undefined ? 'is-invalid' : ''}`"
                                            placeholder="Phone number (required for shipping updates)">
                                        <div class="invalid-feedback">{{ validateErrors.billing_phone }}</div>
                                    </div>
                                </div>
                            </div>
                            <h5 class="packages-form-title">{{ translate('Delivery details') }}</h5>
                            <div class="row mb-3">
                                <div class="check-your-info mb-4">
                                    <label for="pickup">
                                        <input v-model="checkout.is_delivery" type="radio" id="pickup" name="delivery" value="0"  checked />
                                        <span></span>
                                    </label>
                                    {{ translate('Pick up') }}
                                </div>
                                <div class="check-your-info mb-4">
                                    <label for="delivery">
                                        <input v-model="checkout.is_delivery" type="radio" id="delivery"
                                            name="delivery" value="1" />
                                        <span></span>
                                    </label>
                                    {{ translate('Delivery (*Free shipping is available for purchases over 50,000 drams)') }}
                                </div>
                                <div class="row mb-3" v-if="checkout.is_delivery == 1">
                                    <div class="col-lg-6 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_name" type="text"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_name != undefined ? 'is-invalid' : ''}`"
                                                placeholder="First name">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_name }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_lastname" type="text"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_lastname != undefined ? 'is-invalid' : ''}`"
                                                placeholder="Last name">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_lastname }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_email" type="email"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_email != undefined ? 'is-invalid' : ''}`"
                                                placeholder="Email">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_email }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_number" type="number"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_number != undefined ? 'is-invalid' : ''}`"
                                                placeholder="Phone number (required for shipping updates)">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_number }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_country" type="Country"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_country != undefined ? 'is-invalid' : ''}`"
                                                placeholder="Country">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_country }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_city" type="City"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_city != undefined ? 'is-invalid' : ''}`"
                                                placeholder="City">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_city }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_street" type="Street"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_street != undefined ? 'is-invalid' : ''}`"
                                                placeholder="Street">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_street }}</div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-4">
                                        <div class="your-opinion-inputs">
                                            <input v-model="checkout.shipping_flat" type="Flat"
                                                :class="`form-control bg-gray-input required-input ${validateErrors.shipping_flat != undefined ? 'is-invalid' : ''}`"
                                                placeholder="Flat">
                                            <div class="invalid-feedback">{{ validateErrors.shipping_flat }}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <h5 class="packages-form-title">{{ translate('Payment details') }}</h5>
                            <div class="row">
                                <template v-for="payment_method in apiData.payment_methods">
                                    <div v-if="payment_method.key != 'cash'" class="col-lg-6 col-md-12 col-sm-6 col-12 mb-mob-part">
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
                            <div class="check-your-info mt-3">
                                <label for="agreeterms">
                                    <input v-model="checkout.shipping_agree" type="checkbox" id="agreeterms"
                                        name="agreeterms" />
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
                <div class="col-lg-6 col-md-6">
                    <!-- <div class="row align-items-center grid-gap-part mob-d-block">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-3">
                            <div class="d-flex align-items-center grid-gap-back">
                                <nuxt-link  :to="`/${globalData.langUrl}shop`" class="add-to-basket">
                                    <nuxt-img src="/images/bag.svg" class="" width="24" height="24">
                                    </nuxt-img>
                                </nuxt-link>
                                <nuxt-link  :to="`/${globalData.langUrl}`" class="back-link-part">
                                    {{ translate('Back') }}
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="col-auto">
                            <nuxt-link  :to="`/${globalData.langUrl}`" class="img-part">
                                <nuxt-img src="/images/logopilatesboutique.svg" width="259" height="93">
                                </nuxt-img>
                            </nuxt-link>
                        </div>
                    </div> -->
                    <div class="second-part" >
                        <div class="gift-card-content" v-if="cartData.list.length > 0" >
                            <div class="gift-card-row" v-for="item in cartData.list" :key="item.cart_id">
                                <div class="d-flex justify-content-between align-items-center mb-4" v-if="item.count > 0" >
                                    <div class="d-flex grid-gap-part">
                                        <div class="image-part">
                                            <nuxt-img :src="item.product.image" width="120" height="154" class="" alt=""></nuxt-img>
                                        </div>
                                        <div class="text-part">
                                            <h5 class="gift-card-text">
                                                {{ item.product.name }}
                                            </h5>
                                            <template v-for="feature in item.selected_features">
                                                <p class="description-text"  v-if="feature.type == 'checkbox'">{{ feature.feature_name }}:<span>{{ feature.list_name }}</span></p>
                                                <div class="color-part" v-if="feature.type == 'color'">
                                                    <p class="d-flex">{{ translate('Color') }}:  <div class="bg-color" :style="`background-color:${feature.color}`"></div></p>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <p class="count-price">{{ item.count }} x <span class="">{{ item.price }} {{ globalData.currency_title }}</span></p>
                                </div>
                                <hr>
                            </div>
                        </div>
                        <div class="row justify-content-between inputs-part gx-0">
                            <div class="col-lg-7">
                                <input name="" class="form-control" placeholder="Promo code or gift card">
                            </div>
                            <div class="col-lg-4">
                                <button type="button" class="btn-dark w-100">{{ translate('Apply') }}</button>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="price-title">{{ translate('Subtotal') }}</h5>
                            <p class="price-text">{{ cartData.products_total }}  {{ globalData.currency_title }}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <h5 class="price-title">{{ translate('Total') }}</h5>
                            <p class="price-text">{{ cartData.total }} {{ globalData.currency_title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="modal fade order-placed request-sent" id="orderPlaced" data-bs-keyboard="false" data-bs-backdrop="static" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-body py-4 text-center">
                    <h3 class="font-24 bold mb-3">{{ translate('Order is placed') }}</h3>
                    <p class="font-18 px-4 text-center">{{ translate('Order #${order_id} has been successfully placed and is in the process of confirmation.').replace('${order_id}', order_id) }}</p>
                    <nuxt-link :to="`/${globalData.langUrl}my-orders`" class="btn btn-primary fw-bold text-center mx-auto">{{ translate('OK') }}</nuxt-link>
                </div>
            </div>
        </div>
    </div> 
</template>
<style scoped>
.header{
    display: none !important;
}
</style>
