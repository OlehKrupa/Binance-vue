<template>
  <Loader v-if="currencyStore.loader" />
  <div v-else class="table-container">
    <table class="currency-table">
      <thead>
        <tr>
          <th class="order-header">Order</th>
          <th @click="currencyStore.sort('currency_name')">Currency<span v-if="currencyStore.isColumnSorted('currency_name')"> {{
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
        <tr v-for="(currencyData, index) in currencyStore.preferCurrenciesData" :key="currencyData.currency_id"
          :class="{ 'highlighted': currencyStore.isSelected(currencyData.currency_id), 'selected': currencyStore.selectedCurrencyId === currencyData.currency_id }"
          @click="currencyStore.selectRow(currencyData.currency_id)">
          <td>{{ index + 1 }} </td>
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

<script setup>
import { useCurrencyStore } from '../stores/CurrencyStore';
import Loader from '../components/Loader.vue';

const currencyStore = useCurrencyStore();
</script>

<style>@import url('../assets/table.css');</style>
