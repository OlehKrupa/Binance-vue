<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card rounded">
          <div class="card-header">Your Currencies</div>
          <Chart :selectedCurrencyId="dashboardStore.selectedCurrencyId" />
          <Table/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from '../components/Chart.vue';
import Table from '../components/DashboardTable.vue';

import { useDashboardStore } from '../stores/DashboardStore';

const dashboardStore = useDashboardStore();
</script>

<style>
.container {
  padding: 20px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 10px;
  background-color: #f5f5f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: bold;
}
</style>
