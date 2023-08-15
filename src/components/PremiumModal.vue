<template>
    <div v-if="currencyStore.showPremiumModal" class="modal">
        <div class="modal-content">
            <p>{{ modalMessage }}</p>
            <div class="d-flex justify-content-center">
                <button v-if="showOKButton" @click="closeModal" class="btn btn-success mr-2">
                    OK
                </button>
                <button v-if="showPaymentButton" @click="goToPayment" class="btn btn-warning">
                    Go to Payment
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { useCurrencyStore } from '../stores/CurrencyStore';
import { ref } from 'vue';

const currencyStore = useCurrencyStore();

const modalMessage = ref('');
const showOKButton = ref(true);
const showPaymentButton = ref(false);

modalMessage.value = 'Consider upgrading to a premium subscription to track more cryptocurrencies.';
showOKButton.value = true;
showPaymentButton.value = true;

const closeModal = () => {
    currencyStore.showPremiumModal = false;
};

const goToPayment = () => {
    closeModal();
    console.log("Go to payment");
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
</style>  