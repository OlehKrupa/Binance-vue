// stores/CurrencydStore.js
import { defineStore } from 'pinia';
import { allCurrencies } from '../http/currency-api';
import { userPreferences } from '../http/user-api';
import { ref, computed, watch } from 'vue';

export const useCurrencyStore = defineStore('currencyStore', () => {
    const loader = ref(false);
    const currenciesData = ref([]);
    const preferences = ref([]);

    const fetchCurrencies = async () => {
        loader.value = true;
        try {
            const response = await allCurrencies();
            currenciesData.value = response.data.map((currencyData) => ({
                ...currencyData,
                last_sell_price: parseFloat(currencyData.last_sell_price).toFixed(2),
                price_change_percent: parseFloat(currencyData.price_change_percent).toFixed(2),
            }));

            console.log(currenciesData.value);
        } catch (error) {
            console.error('Error', error);
        } finally {
            loader.value = false;
        }
    };

    const fetchPreferences = async () => {
        try {
            const response = await userPreferences();
            preferences.value = response.data;

            console.log(preferences.value)
        } catch (error) {
            console.error('Error', error);
        }
    };

    return {
        loader,
        currenciesData,
        preferences,
        fetchCurrencies,
        fetchPreferences,
    };

})