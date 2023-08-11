import { defineStore } from 'pinia';
import { allCurrencies } from '../http/currency-api';
import { userPreferences, userPreferencesUpdate } from '../http/user-api';
import { ref, computed } from 'vue';

export const usePreferencesStore = defineStore('preferencesStore', () => {

    const currenciesData = ref([]);
    const preferences = ref([]);
    const sortedColumn = ref('full_name');
    const sortDirection = ref('asc');
    const searchQuery = ref('');

    const fetchCurrencies = async () => {
        try {
            const response = await allCurrencies();
            currenciesData.value = response.data.map((currencyData) => ({
                ...currencyData,
                last_sell_price: parseFloat(currencyData.last_sell_price),
                price_change_percent: parseFloat(currencyData.price_change_percent).toString(),
            }));
        } catch (error) {
            console.error('Error', error);
        }
    };

    const fetchPreferences = async () => {
        try {
            const response = await userPreferences();
            preferences.value = response.data;
        } catch (error) {
            console.error('Error', error);
        }
    };

    const isColumnSorted = (column) => sortedColumn.value === column;

    const getSortDirection = (column) => (sortedColumn.value === column ? (sortDirection.value === 'asc' ? '▲' : '▼') : '');

    const isPreferredCurrency = (currencyId) => preferences.value.includes(currencyId);

    const updateUserPreferences = async (currencyId) => {
        try {
            if (isPreferredCurrency(currencyId)) {
                preferences.value = preferences.value.filter(pref => pref !== currencyId);
            } else {
                preferences.value.push(currencyId);
            }
            const selectedCurrencies = preferences.value;
            await userPreferencesUpdate({ selectedCurrencies });
        } catch (error) {
            console.error('Error', error);
        }
    };

    const sort = (column) => {
        if (sortedColumn.value === column) {
            sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortedColumn.value = column;
            sortDirection.value = 'asc';
        }
    };

    const sortedCurrenciesData = computed(() => {
        return currenciesData.value.slice().sort((a, b) => {
            const aValue = a[sortedColumn.value];
            const bValue = b[sortedColumn.value];

            if (sortedColumn.value === 'last_sell_price' || sortedColumn.value === 'price_change_percent') {
                return (parseFloat(aValue) - parseFloat(bValue)) * (sortDirection.value === 'asc' ? 1 : -1);
            } else if (sortedColumn.value === 'full_name') {
                return aValue.localeCompare(bValue) * (sortDirection.value === 'asc' ? 1 : -1);
            } else {
                return (aValue - bValue) * (sortDirection.value === 'asc' ? 1 : -1);
            }
        });
    });

    const filteredCurrencies = computed(() => {
        if (searchQuery.value.length === 0) {
            return sortedCurrenciesData.value;
        }
        const query = searchQuery.value.toLowerCase();
        return sortedCurrenciesData.value.filter((currencyData) => currencyData.full_name.toLowerCase().includes(query));
    });

    fetchCurrencies();
    fetchPreferences();

    return {
        filteredCurrencies,
        searchQuery,
        sort,
        isColumnSorted,
        getSortDirection,
        isPreferredCurrency,
        updateUserPreferences,
    };
});
