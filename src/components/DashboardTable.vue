<template>
  <div class="table-container">
    <table class="currency-table">
      <thead>
        <tr>
          <th class="order-header">Order</th>
          <th @click="sort('currency_name')">Currency<span v-if="sortColumn === 'currency_name'"> {{
            sortDirection === 'asc' ? '▲' : '▼' }}</span></th>
          <th @click="sort('last_sell_price')">Price<span v-if="sortColumn === 'last_sell_price'"> {{ sortDirection ===
            'asc' ? '▲' : '▼' }}</span></th>
          <th @click="sort('price_change_percent')">Rate<span v-if="sortColumn === 'price_change_percent'"> {{
            sortDirection === 'asc' ? '▲' : '▼' }}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currencyData, index) in sortedCurrenciesData" :key="currencyData.currency_id"
          :class="{ 'highlighted': isSelected(currencyData.currency_id), 'selected': selectedCurrencyId === currencyData.currency_id }"
          @click="selectRow(currencyData.currency_id)">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="currency-info">
              <img :src="currencyData.image_url" alt="currency img" class="currency-image" />
              <div class="currency-names">
                <span>{{ currencyData.full_name }}</span>
                <span class="short-name">{{ currencyData.currency_name }}</span>
              </div>
            </div>
          </td>
          <td>{{ parseFloat(currencyData.last_sell_price).toFixed(2) }}</td>
          <td :style="{ color: currencyData.price_change_percent >= 0 ? 'green' : 'red' }">{{
            parseFloat(currencyData.price_change_percent).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { allCurrencies } from '../http/currency-api';
import { userPreferences } from '../http/user-api';

export default {
  data() {
    return {
      currenciesData: [],
      preferences: [],
      sortColumn: 'orderIndex',
      sortDirection: 'asc',
      selectedCurrencyId: null,
    };
  },

  async beforeMount() {
    await this.fetchPreferences();
    await this.fetchCurrencies();
  },

  computed: {
    sortedCurrenciesData() {
      return this.currenciesData
        .slice()
        .filter(currencyData => this.isPreferredCurrency(currencyData.currency_id))
        .sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];

          if (this.sortColumn === 'last_sell_price' || this.sortColumn === 'price_change_percent') {
            return (parseFloat(aValue) - parseFloat(bValue)) * (this.sortDirection === 'asc' ? 1 : -1);
          } else if (this.sortColumn === 'currency_name') {
            return aValue.localeCompare(bValue) * (this.sortDirection === 'asc' ? 1 : -1);
          } else {
            return (aValue - bValue) * (this.sortDirection === 'asc' ? 1 : -1);
          }
        });
    },
  },

  methods: {
    async fetchCurrencies() {
      try {
        const response = await allCurrencies();
        this.currenciesData = response.data.map((currencyData, index) => ({
          ...currencyData,
          orderIndex: index,
          last_sell_price: parseFloat(currencyData.last_sell_price).toFixed(2),
          price_change_percent: parseFloat(currencyData.price_change_percent).toFixed(2),
        }));
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

    sort(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    },

    selectRow(currencyId) {
      this.selectedCurrencyId = this.selectedCurrencyId === currencyId ? null : currencyId;
    },

    isSelected(currencyId) {
      return this.selectedCurrencyId === currencyId;
    },
  },
};
</script>

<style>
@import url('../assets/table.css');
</style>
