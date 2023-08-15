<template>
    <div v-if="currencyStore.showZeroModal" class="modal">
        <div class="modal-content">
            <p>{{ modalMessage }}</p>
            <div class="d-flex justify-content-center">
                <button v-if="showOKButton" @click="closeModal" class="btn btn-success mr-2">
                    OK
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

modalMessage.value = 'You have no preferences yet. Please add some preferences.';
showOKButton.value = true;

const closeModal = () => {
    currencyStore.showZeroModal = false;
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