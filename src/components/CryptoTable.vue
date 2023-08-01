<template>
  <div class="table-container">
    <table class="currency-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Currency</th>
          <th>Price</th>
          <th>Trend</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(currency, index) in currencies" :key="currency.id"
          :class="{ 'highlighted': isPreferredCurrency(currency.id) }" @click="updateUserPreferences(currency.id)">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="currency-info">
              <img :src="currency.image_url" alt="currency img" class="currency-image" />
              <div class="currency-names">
                <span >{{ currency.full_name }}</span>
                <span class="short-name">{{ currency.name }}</span>
              </div>
            </div>
          </td>
          <td>{{ currency.price }}</td>
          <td>{{ currency.trend }}</td>
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
      currencies: [],
      preferences: [],
    };
  },

  async beforeMount() {
    await this.fetchCurrencies();
    await this.fetchPreferences();
  },

  methods: {
    async fetchCurrencies() {
      try {
        const response = await allCurrencies();
        this.currencies = response.data;
      } catch (error) {
        console.error('Ошибка', error);
      }
    },

    async fetchPreferences() {
      try {
        const response = await userPreferences();
        this.preferences = response.data;
      } catch (error) {
        console.error('Ошибка', error);
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
        console.error('Ошибка', error);
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