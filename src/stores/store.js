// store.js
import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
  state() {
    return {
      currenciesData: [],
      preferences: [],
      sortColumn: 'order',
      sortDirection: 'asc',
      selectedCurrencyId: null, // Track the selected currency ID
    };
  },
  actions: {
    async fetchCurrencies() {
      try {
        const response = await allCurrencies();
        this.currenciesData = response.data;
      } catch (error) {
        console.error('Error', error);
      }
    },

    async fetchPreferences() {
      try {
        const response = await userPreferences();
        this.preferences = response.data;
      } catch (error) {
        console.error('Error', error);
      }
    },

    isPreferredCurrency(currencyId) {
      return this.preferences.includes(currencyId);
    },

    formatNumber(value) {
      if (Number.isFinite(value)) {
        return value.toFixed(2);
      } else {
        return '';
      }
    },

    sort(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },

    // Method to handle row selection and save the selected currency ID in the store
    selectRow(currencyId) {
      this.selectedCurrencyId = currencyId;
    },

    // Check if the row is selected based on the currency ID
    isSelected(currencyId) {
      return this.selectedCurrencyId === currencyId;
    },
  },
});
