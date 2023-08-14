<template>
  <tr
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
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  currencyData: Object,
  index: Number,
  isSelected: Function,
  selectedCurrencyId: Number,
  selectRow: Function,
});
</script>
