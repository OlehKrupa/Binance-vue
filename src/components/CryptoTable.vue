<!-- CryptoTable.vue -->
<template>
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Full name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="currency in currencies" :key="currency.id">
            <td>{{ currency.name }}</td>
            <td>{{ currency.full_name }}</td>
            <td>
              <img :src="currency.image_url" alt="currency img" style="width: 30px; height: 30px;" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { allCurrencies } from '../http/currency-api';
  
  export default {
    data() {
      return {
        currencies: [],
      };
    },
  
    async created() {
      this.fetchCurrencies();
    },
  
    methods: {
      async fetchCurrencies() {
        try {
          const response = await allCurrencies();
          console.log(response);
          this.currencies = response.data;
        } catch (error) {
          console.error('Error', error);
        }
      },
    },
  };
  </script>  