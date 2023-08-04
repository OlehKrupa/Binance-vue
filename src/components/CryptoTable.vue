<template>
  <div class="table-container">
    <div class="search-container">
      <input type="text" v-model="searchQuery" @input="filterCurrencies" placeholder="Search currency..."
        class="search-input" />
    </div>
    <table class="currency-table">
      <thead>
        <tr>
          <th class="order-header">Order</th>
          <th @click="sort('full_name')">Currency<span v-if="isColumnSorted('full_name')"> {{
            getSortDirection('full_name') }}</span></th>
          <th @click="sort('last_sell_price')">Price<span v-if="isColumnSorted('last_sell_price')"> {{
            getSortDirection('last_sell_price') }}</span></th>
          <th @click="sort('price_change_percent')">Rate<span v-if="isColumnSorted('price_change_percent')"> {{
            getSortDirection('price_change_percent') }}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currencyData, index) in filteredCurrencies" :key="currencyData.currency_id"
          :class="{ 'highlighted': isPreferredCurrency(currencyData.currency_id) }"
          @click="updateUserPreferences(currencyData.currency_id)">
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
          <td>{{ currencyData.last_sell_price }}</td>
          <td :style="{ color: currencyData.price_change_percent >= 0 ? 'green' : 'red' }">{{
            currencyData.price_change_percent }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { allCurrencies } from '../http/currency-api';
import { userPreferences, userPreferencesUpdate } from '../http/user-api';

export default {
  data() {
    return {
      currenciesData: [],
      preferences: [],
      sortedColumn: 'full_name',
      sortDirection: 'asc',
      searchQuery: '',
    };
  },

  async beforeMount() {
    await this.fetchCurrencies();
    await this.fetchPreferences();
  },

  computed: {
    sortedCurrenciesData() {
      let sortedData = this.currenciesData.slice();

      sortedData = sortedData.sort((a, b) => {
        const aValue = a[this.sortedColumn];
        const bValue = b[this.sortedColumn];

        return aValue.toString().localeCompare(bValue.toString()) * (this.sortDirection === 'asc' ? 1 : -1);
      });

      return sortedData;
    },

    filteredCurrencies() {
      if (this.searchQuery.length === 0) {
        return this.sortedCurrenciesData;
      }

      const query = this.searchQuery.toLowerCase();
      return this.sortedCurrenciesData.filter((currencyData) =>
        currencyData.full_name.toLowerCase().includes(query)
      );
    },
  },

  methods: {
    async fetchCurrencies() {
      try {
        const response = await allCurrencies();
        this.currenciesData = response.data.map((currencyData, index) => ({
          ...currencyData,
          orderIndex: index,
          last_sell_price: parseFloat(currencyData.last_sell_price),
          price_change_percent: parseFloat(currencyData.price_change_percent).toString(),
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

    isColumnSorted(column) {
      return this.sortedColumn === column;
    },

    getSortDirection(column) {
      return this.sortedColumn === column ? (this.sortDirection === 'asc' ? '▲' : '▼') : '';
    },

    isPreferredCurrency(currencyId) {
      return this.preferences.includes(currencyId);
    },

    async updateUserPreferences(currencyId) {
      try {
        if (this.isPreferredCurrency(currencyId)) {
          this.preferences = this.preferences.filter(pref => pref !== currencyId);
        } else {
          this.preferences.push(currencyId);
        }
        const selectedCurrencies = this.preferences;
        await userPreferencesUpdate({ selectedCurrencies });
      } catch (error) {
        console.error('Error', error);
      }
    },

    sort(column) {
      if (this.sortedColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortedColumn = column;
        this.sortDirection = 'asc';
      }
    },
  },
};
</script>

<style>
@import url('../assets/table.css');
</style>
