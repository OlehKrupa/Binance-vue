<template>
    <div>
      <stripe-checkout
        ref="checkoutRef"
        mode="subscription"
        :pk="publishableKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="v => loading = v"
      />
      <button @click="submit">Subscribe!</button>
    </div>
  </template>
  
  <script>
  import { StripeCheckout } from '@vue-stripe/vue-stripe';
  export default {
    components: {
      StripeCheckout,
    },
    data () {
      this.publishableKey = "pk_test_51Ng6pYDtedehY5EN8M2apUVXmZtxuZSXlSXN4DKYfXKy8lt9qfE0eGot3n7Ot0oQKlillBcYluVB7j0iOUx5x8zI00BUNje7fW";
      return {
        loading: false,
        lineItems: [
          {
            price: 'pi_3NgRiGDtedehY5EN0Lvsbp78', // The id of the recurring price you created in your Stripe dashboard
            quantity: 1,
          },
        ],
        successURL: '#',
        cancelURL: '#',
      };
    },
    methods: {
      submit () {
        // You will be redirected to Stripe's secure checkout page
        this.$refs.checkoutRef.redirectToCheckout();
      },
    },
  };
  </script>