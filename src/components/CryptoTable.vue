<template>
  <div class="table-container">
    <table class="currency-table">
      <thead>
        <tr>
          <th>Order</th>
          <th>Currency</th>
          <th @click="sort('last_price')">Price<span v-if="sortColumn === 'last_price'"> {{ sortDirection === 'asc' ? '▲' : '▼' }}</span></th>
          <th @click="sort('trend')">Trend<span v-if="sortColumn === 'trend'"> {{ sortDirection === 'asc' ? '▲' : '▼' }}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currencyData, index) in sortedCurrenciesData" :key="currencyData.currency.id"
          :class="{ 'highlighted': isPreferredCurrency(currencyData.currency.id) }"
          @click="updateUserPreferences(currencyData.currency.id)">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="currency-info">
              <img :src="currencyData.currency.image_url" alt="currency img" class="currency-image" />
              <div class="currency-names">
                <span>{{ currencyData.currency.full_name }}</span>
                <span class="short-name">{{ currencyData.currency.name }}</span>
              </div>
            </div>
          </td>
          <td>{{ formatNumber(currencyData.last_price) }}</td>
          <td :style="{ color: currencyData.trend >= 0 ? 'green' : 'red' }">{{ formatNumber(currencyData.trend) }}</td>
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
      sortColumn: 'order',
      sortDirection: 'asc',
    };
  },

  async beforeMount() {
    await this.fetchCurrencies();
    await this.fetchPreferences();
  },

  computed: {
    sortedCurrenciesData() {
      return this.currenciesData.slice().sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (typeof aValue === 'string') {
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
        this.currenciesData = response.data;
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

    formatNumber(value) {
      if (Number.isFinite(value)) {
        return value.toFixed(2);
      } else {
        return '';
      }
    },

    sort(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
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
  cursor: pointer; /* Add cursor pointer on column headers */
}

.currency-table th {
  background-color: #f2f2f2;
}

.currency-table tr:hover {
  background-color: #f9f9f9;
}

.currency-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.highlighted {
  background-color: #cf9;
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
