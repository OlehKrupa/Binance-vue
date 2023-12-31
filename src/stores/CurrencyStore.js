import { defineStore } from 'pinia';
import { allCurrencies } from '../http/currency-api';
import { userPreferences, userPreferencesUpdate } from '../http/user-api';
import { ref, computed, watch } from 'vue';

import { useAuthStore } from './auth';

export const useCurrencyStore = defineStore('currencyStore', () => {
    const authStore = useAuthStore();

    const loader = ref(false);
    const currenciesData = ref([]);
    const selectedCurrencyId = ref(0);
    const preferences = ref([]);
    const sortColumn = ref('orderIndex');
    const sortDirection = ref('asc');
    const searchQuery = ref('');

    const showZeroModal = ref(false);
    const showPremiumModal = ref(false);

    const manualFetchData = async () => {
        if (currenciesData.value.length === 0) {
            await fetchCurrencies();
        }
        if (preferences.value.length === 0) {
            await fetchPreferences();
        }
    }

    const selectedCurrencyIdOnLocalStorage = localStorage.getItem('selectedId');
    if (selectedCurrencyIdOnLocalStorage) {
        selectedCurrencyId.value = parseInt(selectedCurrencyIdOnLocalStorage);
    }

    const isPreferredCurrency = (currencyId) => preferences.value.includes(currencyId);

    const compareValues = (aValue, bValue) => {
        if (sortColumn.value === 'last_sell_price' || sortColumn.value === 'price_change_percent') {
            return (parseFloat(aValue) - parseFloat(bValue)) * (sortDirection.value === 'asc' ? 1 : -1);
        } else if (sortColumn.value === 'currency_name') {
            return aValue.localeCompare(bValue) * (sortDirection.value === 'asc' ? 1 : -1);
        } else {
            return (aValue - bValue) * (sortDirection.value === 'asc' ? 1 : -1);
        }
    };

    const preferCurrenciesData = computed(() => {
        return currenciesData.value
            .slice()
            .filter((currencyData) => isPreferredCurrency(currencyData.currency_id))
            .sort((a, b) => compareValues(a[sortColumn.value], b[sortColumn.value]));
    });

    const sortedCurrenciesData = computed(() => {
        return currenciesData.value.slice().sort((a, b) => compareValues(a[sortColumn.value], b[sortColumn.value]));
    });

    const fetchCurrencies = async () => {
        loader.value = true;
        try {
            const response = await allCurrencies();
            currenciesData.value = response.data.map((currencyData) => ({
                ...currencyData,
                last_sell_price: parseFloat(currencyData.last_sell_price).toFixed(2),
                price_change_percent: parseFloat(currencyData.price_change_percent).toFixed(2),
            }));
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
            if (preferences.value.length > 0) {
                selectedCurrencyId.value = preferences.value[0];
            } else {
                showZeroModal.value = true;
            }
        } catch (error) {
            console.error('Error', error);
        }
    };

    const updateUserPreferences = async (currencyId) => {
        try {
            if (isPreferredCurrency(currencyId)) {
                preferences.value = preferences.value.filter((pref) => pref !== currencyId);
            } else {
                if (authStore.isPremium != null) {
                    preferences.value.push(currencyId);
                }
                if ((preferences.value.length >= 4) && (authStore.isPremium === null)) {
                    const elementsToRemove = preferences.value.length - 4;
                    if (elementsToRemove > 0) {
                        preferences.value.splice(preferences.value.length - elementsToRemove, elementsToRemove);
                    }
                    showPremiumModal.value = true;
                } else {
                    preferences.value.push(currencyId);
                }
            }
            const selectedCurrencies = preferences.value;
            if (selectedCurrencies.length === 0) {
                showZeroModal.value = true;
            }
            await userPreferencesUpdate({ selectedCurrencies });
        } catch (error) {
            console.error('Error', error);
        }
    };

    const sort = (column) => {
        if (sortColumn.value === column) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortColumn.value = column;
            sortDirection.value = 'asc';
        }
    };

    const selectRow = (currencyId) => {
        if (selectedCurrencyId.value === currencyId) {
            return;
        }

        selectedCurrencyId.value = selectedCurrencyId.value === currencyId ? null : currencyId;
    };

    const isSelected = (currencyId) => selectedCurrencyId.value === currencyId;

    const isColumnSorted = (column) => sortColumn.value === column;

    const getSortDirection = (column) => (sortColumn.value === column ? (sortDirection.value === 'asc' ? '▲' : '▼') : '');

    const filteredCurrencies = computed(() => {
        if (searchQuery.value.length === 0) {
            return sortedCurrenciesData.value;
        }
        const query = searchQuery.value.toLowerCase();
        return sortedCurrenciesData.value.filter((currencyData) => currencyData.full_name.toLowerCase().includes(query));
    });

    watch(
        () => selectedCurrencyId,
        (state) => {
            localStorage.setItem('selectedId', state._value);
        },
        { deep: true }
    );

    manualFetchData();
    //1 minute
    //const fetchInterval = 1 * 60 * 1000;
    //setInterval(fetchData, fetchInterval);

    // const fetchData = async () => {
    //     await fetchCurrencies();
    //     await fetchPreferences();
    // }

    return {
        loader,
        showZeroModal,
        showPremiumModal,
        currenciesData,
        preferences,
        preferCurrenciesData,
        selectedCurrencyId,
        sortColumn,
        sortDirection,
        filteredCurrencies,
        searchQuery,
        isPreferredCurrency,
        fetchCurrencies,
        fetchPreferences,
        sort,
        selectRow,
        isSelected,
        updateUserPreferences,
        isColumnSorted,
        getSortDirection,
    };
});
