<script setup>

const { $getImage, $sendApi } = useNuxtApp()
const globalData = inject('globalData')
const translate = inject('translate')
const Swal = inject('$swal')
const openModal = inject('openModal')
const closeModal = inject('closeModal')

const props = defineProps({
    userData: ref(),
    content: {},
    apiData: {},
    cartData: {},
    globalData: {}
});

const apiData = props.apiData

// const isOpenedAdd = ref(false)
// const isOpenedEdit = ref(false)

function openAddAddress(){
    openModal('addAddress')
}

const address = ref({
    id: "",
    address: "",
    building: "",
    apartment: "",
    entrance: "",
    floor: "",
    default: 0
})

const validateErrors = ref({});

async function addAddress(e){

    e.preventDefault()

    let addressData = await $sendApi(`/api/address/add`, address.value);

    if(addressData.status != 200){
        validateErrors.value = addressData.errors;

        if(addressData.message != undefined){
            Swal.fire({
                title: addressData.title,
                text: addressData.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });

        }

    }
    else {
     
        validateErrors.value = {};

        if(addressData.address != undefined){
            console.log(apiData.addresses)
            apiData.addresses.push(addressData.address);

            closeModal('addAddress')
            address.value = {}

        }

    }

}

function openEdit(data){
    let editAddress = toRaw(data);
    address.value = Object.assign({}, editAddress)
    // openModal('editAddress')
}
async function editAddress(e){

e.preventDefault()

let addressData = await $sendApi(`/api/address/edit`, address.value);

if(addressData.status != 200){
    validateErrors.value = addressData.errors;

    if(addressData.message != undefined){
        Swal.fire({
            title: addressData.title,
            text: addressData.message,
            icon: 'error',
            confirmButtonText: 'OK'
        });

    }
}
else {

    validateErrors.value = {};

    if(addressData.address != undefined){

        for(let i in apiData.addresses){
            if(apiData.addresses[i].id == addressData.address.id){
                apiData.addresses[i] = addressData.address
            }
        }

        closeModal('editAddress')
        address.value = {}

    }

}

}


async function deleteAddress(address){

    Swal.fire({
        title: 'Delete',
        text: 'Are you sure you want to delete?',
        icon: 'warning',
        showDenyButton:!0,
        confirmButtonText: "Yes",
        denyButtonText: "No",
    }).then(async (result) => {
        if (result.value) {

            let addressData = await $sendApi(`/api/address/remove`, address);

            if(addressData.status != 200){

                Swal.fire({
                    title: addressData.title,
                    text: addressData.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });

            }
            else {
                address.deleted = 1

                console.log(address);

            }
        }
        else {
            // cancelHandler();
        }
    });;



}

</script>

<script>
export default {
    props: {
        content: {},
        apiData: {},
        cartData: {},
        userData: {},
        globalData: {},
    },
};

</script>
<template>
    <section class="my-account address">
        <div class="container">
            <div class="row justify-content-center align-items-center mb-5 mob-justify-center">
                <AccountSidebar></AccountSidebar>
            </div>
            <div class="row grid-gap-between-mob justify-content-between">
                <div class="col-lg-5 col-md-6 col-sm-12">
                 
                    <div class="address-info-main" v-if="apiData.addresses != undefined && apiData.addresses.length > 0">

                        <div class="my-account-address-edit"  v-for="address in apiData.addresses">
                            <div v-if="address.deleted == 0">
                                <h6 class="my-account-title">
                                    {{ translate('Address - ') }}
                                    {{ address.address }},
                                    {{ address.city }},
                                    {{ address.street }},
                                    {{ address.building }},
                                    {{ address.apartment }}
                                </h6>
                                <div class="d-flex buttons-grid-gap">
                                    <button @click="deleteAddress(address)" class="">
                                        <nuxt-img src="/images/delete.svg" class="" width="48" height="48" alt=""></nuxt-img>
                                    </button>
                                    <button data-bs-toggle="modal" data-bs-target="#editAddress" @click="openEdit(address)" class="">
                                        <nuxt-img src="/images/edit.svg" class="" width="48" height="48" alt=""></nuxt-img>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <form @submit="addAddress">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-6 col-12 mb-4">
                                <div class="your-opinion-inputs">
                                    <input v-model="address.address" type="text" :class="`form-control bg-gray-input ${validateErrors.address != undefined ? 'is-invalid' : ''}`" name="country" placeholder="Country" >
                                    <div class="invalid-feedback">{{ validateErrors.address }}</div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-6 col-12 mb-4">
                                <div class="your-opinion-inputs">
                                    <input v-model="address.city" type="text" :class="`form-control bg-gray-input ${validateErrors.city != undefined ? 'is-invalid' : ''}`" name="city" placeholder="City" >
                                    <div class="invalid-feedback">{{ validateErrors.city }}</div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-6 col-12 mb-4">
                                <div class="your-opinion-inputs">
                                    <input v-model="address.street"  type="text" :class="`form-control bg-gray-input ${validateErrors.street != undefined ? 'is-invalid' : ''}`" name="street" placeholder="Street" >
                                    <div class="invalid-feedback">{{ validateErrors.street }}</div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-6 col-12 mb-4">
                                <div class="your-opinion-inputs">
                                    <input v-model="address.apartment"  type="text" :class="`form-control bg-gray-input ${validateErrors.apartment != undefined ? 'is-invalid' : ''}`" name="apartment" placeholder="Apartment" >
                                    <div class="invalid-feedback">{{ validateErrors.apartment }}</div>
                                </div>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-4">
                                <div class="your-opinion-inputs">
                                    <input v-model="address.building"  type="text" :class="`form-control bg-gray-input ${validateErrors.building != undefined ? 'is-invalid' : ''}`" name="building" placeholder="Building" >
                                    <div class="invalid-feedback">{{ validateErrors.building }}</div>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn-dark w-100 ">
                                    {{ translate('Save') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editAddress">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h4 class="modal-title fw-bold">{{ translate('Edit address') }}</h4>
                        <button type="button" class="close fs-4" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit="editAddress">
                        <div class="modal-body border-0">
                            <div class="row">
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="address.address" type="text" :class="`form-control bg-gray-input ${validateErrors.address != undefined ? 'is-invalid' : ''}`" name="country" placeholder="Country" >
                                        <div class="invalid-feedback">{{ validateErrors.address }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="address.city" type="text" :class="`form-control bg-gray-input ${validateErrors.city != undefined ? 'is-invalid' : ''}`" name="city" placeholder="City" >
                                        <div class="invalid-feedback">{{ validateErrors.city }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="address.street"  type="text" :class="`form-control bg-gray-input ${validateErrors.street != undefined ? 'is-invalid' : ''}`" name="street" placeholder="Street" >
                                        <div class="invalid-feedback">{{ validateErrors.street }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="address.apartment"  type="text" :class="`form-control bg-gray-input ${validateErrors.apartment != undefined ? 'is-invalid' : ''}`" name="apartment" placeholder="Apartment" >
                                        <div class="invalid-feedback">{{ validateErrors.apartment }}</div>
                                    </div>
                                </div>
                                <div class="col-lg-12 mb-4">
                                    <div class="your-opinion-inputs">
                                        <input v-model="address.building"  type="text" :class="`form-control bg-gray-input ${validateErrors.building != undefined ? 'is-invalid' : ''}`" name="building" placeholder="Building" >
                                        <div class="invalid-feedback">{{ validateErrors.building }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="submit" class="btn btn-secondary change-data-btn">
                                {{ translate('Save') }}
                            </button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ translate('Close') }}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section> 
</template>