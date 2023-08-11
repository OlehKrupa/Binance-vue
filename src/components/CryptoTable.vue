<template>
  <div class="table-container">
    <div class="search-container">
      <input type="text" v-model="preferencesStore.searchQuery" @input="preferencesStore.filterCurrencies" placeholder="Search currency..."
        class="search-input" />
    </div>
    <table class="currency-table">
      <thead>
        <tr>
          <th class="order-header">Order</th>
          <th @click="preferencesStore.sort('full_name')">Currency<span v-if="preferencesStore.isColumnSorted('full_name')"> {{
            preferencesStore.getSortDirection('full_name') }}</span></th>
          <th @click="preferencesStore.sort('last_sell_price')">Price<span v-if="preferencesStore.isColumnSorted('last_sell_price')"> {{
            preferencesStore.getSortDirection('last_sell_price') }}</span></th>
          <th @click="sort('price_change_percent')">Rate<span v-if="preferencesStore.isColumnSorted('price_change_percent')"> {{
            preferencesStore.getSortDirection('price_change_percent') }}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currencyData, index) in preferencesStore.filteredCurrencies" :key="currencyData.currency_id"
          :class="{ 'highlighted': preferencesStore.isPreferredCurrency(currencyData.currency_id) }"
          @click="preferencesStore.updateUserPreferences(currencyData.currency_id)">
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

<script setup>
import { usePreferencesStore } from '../stores/PreferencesStore';

const preferencesStore = usePreferencesStore();
</script>

<style>
@import url('../assets/table.css');
</style>
