<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card rounded">
                    <stripe-checkout  
                    ref="checkoutSubRef" 
                    :pk="publishableKey" 
                    :sessionId="sessionSubId"
                    @loading="v => loading = v"
                     />
                    <button class="btn btn-primary" @click="submitSub">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import axios from 'axios';

export default {
    components: {
        StripeCheckout,
    },

    mounted() {
        this.getSession();
    },

    data() {
        //move to .env
        this.publishableKey = 'pk_test_51Ng6pYDtedehY5EN8M2apUVXmZtxuZSXlSXN4DKYfXKy8lt9qfE0eGot3n7Ot0oQKlillBcYluVB7j0iOUx5x8zI00BUNje7fW';
        return {
            loading:false,
            sessionSubId: null
        }
    },

    methods: {
        getSession() {
            axios.get('http://localhost:80/api/getSession').then(res => { 
                this.sessionSubId = res.data.sub.id 
            }).catch(err => { console.log(err) })
        },
        submitSub() {
            this.$refs.checkoutSubRef.redirectToCheckout();
        },
    },
};
</script>
  