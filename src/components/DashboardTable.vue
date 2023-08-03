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
          last_sell_price: currencyData.last_sell_price.toString(),
          price_change_percent: currencyData.price_change_percent.toString(),
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
.table-container {
  margin: 20px;
}

.currency-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.currency-table th,
.currency-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.currency-table th.order-header {
  cursor: default; /* Set the cursor to default for the "Order" column header */
}

.currency-table th {
  background-color: #f2f2f2;
}

/* Modify the hover effect to have a subtle blue highlight for unselected rows */
.currency-table tr:not(.highlighted):hover {
  background-color: #f0f5ff;
}

/* Modify the highlighted class to have a more muted blue background and change font color to a darker shade */
.currency-table tr.highlighted {
  background-color: #cce4ff;
  color: #333;
  cursor: pointer;
}

/* Override the hover effect for selected rows to keep the green color */
.currency-table tr.highlighted.selected {
  background-color: #cce4ff;
  /* Keep the highlighted background color */
  color: #333;
  /* Keep the dark font color */
}

.currency-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.currency-info {
  display: flex;
  align-items: center;
}

.currency-names {
  margin-left: 5px;
}

.short-name {
  margin-left: 5px;
  font-size: 12px;
  color: #666;
}
</style>
