<template>
    <div v-if="currencyStore.showPremiumModal" class="modal">
        <div class="modal-content">
            <p>{{ modalMessage }}</p>
            <div class="d-flex justify-content-center">
                <button v-if="showOKButton" @click="closeModal" class="btn btn-success mr-2">
                    OK
                </button>
                <div class="loader-container" v-if="paymentStore.loading.value">
                    <Loader class="loader" />
                </div>
                <div v-else>
                    <stripe-checkout ref="checkoutSubRef" :pk="paymentStore.publishableKey"
                        :sessionId="paymentStore.sessionSubId.value" />
                    <button class="btn btn-primary" @click="submit">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useCurrencyStore } from '../stores/CurrencyStore';
import { ref } from 'vue';
import Loader from '../components/LoaderMini.vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import { usePaymentStore } from '../stores/PaymentStore';

const currencyStore = useCurrencyStore();

const modalMessage = ref('Consider upgrading to a premium subscription to track more cryptocurrencies.');
const showOKButton = ref(true);

const paymentStore = usePaymentStore();
const checkoutSubRef = ref(null);

const submit = () => {
    if (checkoutSubRef.value) {
        checkoutSubRef.value.redirectToCheckout();
    }
};

const closeModal = () => {
    currencyStore.showPremiumModal = false;
};
</script>
  
<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
}

.loader {
    height: 100%;
    width: 100%;
}
</style>
  