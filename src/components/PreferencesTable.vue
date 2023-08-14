<template>
  <Loader v-if="currencyStore.loader" />
  <div v-else class="table-container">
    <div class="search-container">
      <input type="text" v-model="currencyStore.searchQuery" @input="currencyStore.filterCurrencies"
        placeholder="Search currency..." class="search-input" />
    </div>
    <table class="currency-table">
      <thead>
        <tr>
          <th class="order-header">Order</th>
          <th @click="currencyStore.sort('currency_name')">Currency<span
              v-if="currencyStore.isColumnSorted('currency_name')"> {{
                currencyStore.getSortDirection('currency_name') }}</span></th>
          <th @click="currencyStore.sort('last_sell_price')">Price<span
              v-if="currencyStore.isColumnSorted('last_sell_price')"> {{
                currencyStore.getSortDirection('last_sell_price') }}</span></th>
          <th @click="currencyStore.sort('price_change_percent')">Rate<span
              v-if="currencyStore.isColumnSorted('price_change_percent')"> {{
                currencyStore.getSortDirection('price_change_percent') }}</span></th>
        </tr>
      </thead>
      <tbody>
        <TableRow v-for="(currencyData, index) in currencyStore.filteredCurrencies" :key="currencyData.currency_id"
          :currencyData="currencyData" :index="index" :isSelected="currencyStore.isPreferredCurrency"
          :selectedCurrencyId="currencyStore.selectedCurrencyId" :selectRow="currencyStore.updateUserPreferences" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useCurrencyStore } from '../stores/CurrencyStore';
import Loader from '../components/Loader.vue';
import TableRow from './TableRow.vue';

const currencyStore = useCurrencyStore();
</script>

<style>
@import url('../assets/table.css');
</style>
