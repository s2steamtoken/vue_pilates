<script setup>

const globalData = inject('globalData')
const translate = inject('translate')

function openOrderInfo(order) {
    if (order.opened == 1) {
        order.opened = 0
    }
    else {
        order.opened = 1
    }

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
    <section class="error-page py-170">
        <div class="container">
            <div class="error-main-part text-center">
                <h1 class="error-title">Error</h1>
                <div class="error-main-image">
                    <nuxt-img  
                    src="/images/error.svg" width="1111" height="413" class="" />
                </div>
            </div>
        </div>
    </section>
</template>
