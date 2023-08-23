<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card rounded">
          <div class="card-header">Your Currencies</div>
          <Chart :selectedCurrencyId="parseInt(currencyStore.selectedCurrencyId)" />
          <Table/>
        </div>
      </div>
      
      <!-- Sidebar -->
      <div class="col-md-4">
        <div class="card rounded">
          <div class="card-header">Breaking news</div>
          <News/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from '../components/Chart.vue';
import Table from '../components/DashboardTable.vue';
import News from '../components/NewsList.vue';

import { useCurrencyStore } from '../stores/CurrencyStore';

const currencyStore = useCurrencyStore();
</script>

<style>
.container {
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-header {
  padding: 10px;
  padding-inline: 20px;
  background-color: #f5f5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
  font-size: 18px;
}
</style>
