<template>
  <div class="container d-flex justify-content-center mt-5">
    <stripe-checkout
    ref="checkoutRef" 
    :pk="publishableKey" 
    :sessionId="sessionId"
    />
    <button class="btn btn-primary" @click="submit">Pay now!</button>
  </div>
</template>
  
<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import axios from 'axios';

export default {
  comsponents: {
    StripeCheckout
  },
  
  data() {
    return {
      publishableKey: 'pk_test_51Ng6pYDtedehY5EN8M2apUVXmZtxuZSXlSXN4DKYfXKy8lt9qfE0eGot3n7Ot0oQKlillBcYluVB7j0iOUx5x8zI00BUNje7fW',
      sessionId:null
    }
  },

  mounted() {
    this.getSession()
  },

  methods: {
    getSession() {
      axios.get('http://localhost:80/api/getSession').then(res => {this.sessionId = res.data.id}).catch(err => {console.log(err)})
    },

    submit() {
      this.$refs.checkoutRef.redirectToCheckout();
    },
  },
}
</script>