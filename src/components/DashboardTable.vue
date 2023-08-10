<template>
  <div class="table-container">
    <Loader v-if="useDashboardStore.loader" />
    <table v-else class="currency-table">
      <thead>
        <tr>
          <th class="order-header">Order</th>
          <th @click="dashboardStore.sort('currency_name')">Currency<span v-if="dashboardStore.sortColumn === 'currency_name'"> {{
            dashboardStore.sortDirection === 'asc' ? '▲' : '▼' }}</span></th>
          <th @click="dashboardStore.sort('last_sell_price')">Price<span v-if="dashboardStore.sortColumn === 'last_sell_price'"> {{ dashboardStore.sortDirection ===
            'asc' ? '▲' : '▼' }}</span></th>
          <th @click="dashboardStore.sort('price_change_percent')">Rate<span v-if="dashboardStore.sortColumn === 'price_change_percent'"> {{
            dashboardStore.sortDirection === 'asc' ? '▲' : '▼' }}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currencyData, index) in dashboardStore.sortedCurrenciesData" :key="currencyData.currency_id"
          :class="{ 'highlighted': dashboardStore.isSelected(currencyData.currency_id), 'selected': dashboardStore.selectedCurrencyId === currencyData.currency_id }"
          @click="dashboardStore.selectRow(currencyData.currency_id)">
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
import { useDashboardStore } from '../stores/DashboardStore';
import Loader from '../components/Loader.vue';

const dashboardStore = useDashboardStore();

</script>

<style>
@import url('../assets/table.css');
</style>
