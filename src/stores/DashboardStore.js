// stores/DashboardStore.js
import { defineStore } from 'pinia';
import { allCurrencies } from '../http/currency-api';
import { userPreferences } from '../http/user-api';
import { ref, computed, watch } from 'vue';

export const useDashboardStore = defineStore('dashboardStore', () => {
  const loader = ref(false);
  const currenciesData = ref([]);
  const selectedCurrencyId = ref(0);
  const preferences = ref([]);
  const sortColumn = ref('orderIndex');
  const sortDirection = ref('asc');

  const selectedCurrencyIdOnLocalStorage = localStorage.getItem("selectedId")
  if (selectedCurrencyIdOnLocalStorage) {
    selectedCurrencyId.value = selectedCurrencyIdOnLocalStorage;
  };

  const isPreferredCurrency = currencyId => preferences.value.includes(currencyId);

  const sortedCurrenciesData = computed(() => {
    console.log(preferences);
    return currenciesData.value
      .slice()
      .filter(currencyData => isPreferredCurrency(currencyData.currency_id))
      .sort((a, b) => {
        const aValue = a[sortColumn.value];
        const bValue = b[sortColumn.value];

        if (sortColumn.value === 'last_sell_price' || sortColumn.value === 'price_change_percent') {
          return (parseFloat(aValue) - parseFloat(bValue)) * (sortDirection.value === 'asc' ? 1 : -1);
        } else if (sortColumn.value === 'currency_name') {
          return aValue.localeCompare(bValue) * (sortDirection.value === 'asc' ? 1 : -1);
        } else {
          return (aValue - bValue) * (sortDirection.value === 'asc' ? 1 : -1);
        }
      });
  });

  const fetchCurrencies = async () => {
    loader.value = true;
    try {
      const response = await allCurrencies();
      currenciesData.value = response.data.map((currencyData, index) => ({
        ...currencyData,
        orderIndex: index,
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
    } catch (error) {
      console.error('Error', error);
    }
  };

  const sort = column => {
    if (sortColumn.value === column) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.value = column;
      sortDirection.value = 'asc';
    }
  };

  const selectRow = currencyId => {
    if (selectedCurrencyId.value === currencyId) {
      return;
    }

    selectedCurrencyId.value = selectedCurrencyId.value == currencyId ? null : currencyId;
  };

  const isSelected = currencyId => selectedCurrencyId.value == currencyId;

  fetchCurrencies();
  fetchPreferences();

  watch(
    () => selectedCurrencyId,
    (state) => {
      localStorage.setItem("selectedId", state._value);
    },
    { deep: true }
  );

  return {
    loader,
    sortedCurrenciesData,
    selectedCurrencyId,
    sortColumn,
    sortDirection,
    isPreferredCurrency,
    fetchCurrencies,
    fetchPreferences,
    sort,
    selectRow,
    isSelected,
  };
});