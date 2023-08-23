<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container py-2">
      <a class="navbar-brand">
        <span>Binance</span>
        <strong>2.0</strong>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-if="authStore.isLoggedIn">
          <li class="nav-item">
            <router-link :to="{ name: 'dashboard' }" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'preferences' }" class="nav-link">Preferences</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <template v-if="!authStore.isLoggedIn">
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="btn btn-outline-secondary ms-2">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'register' }" class="btn btn-danger ms-2">Register</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="toggleClass" @click.prevent="toggle" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ authStore.user.first_name }}
                {{ authStore.user.last_name }}
                <span class="subscription-label" v-if="authStore.isPremium">
                  {{ authStore.isPremium ? '★' : '' }}
                </span>

              </a>
              <ul class="dropdown-menu" :class="toggleClass">
                <li><a href="#" class="dropdown-item" @click.prevent="logout">Logout</a></li>
                <li>
                  <a href="#" class="dropdown-item" @click.prevent="toggleSubscription">
                    {{ authStore.isSubscribed ? 'Unsubscribe' : 'Subscribe' }}
                  </a>
                </li>
                <li v-if="authStore.isPremium">
                  <a href="#" class="dropdown-item" @click.prevent="paymentStore.handleCancelPremium">Cancel premium pay</a>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import { useAuthStore } from "../stores/auth";
import { usePaymentStore } from "../stores/PaymentStore";
import { userSubscribe } from '../http/user-api';

const authStore = useAuthStore();
const paymentStore = usePaymentStore();

const isOpen = ref(false);

const logout = async () => {
  await authStore.handleLogout();
  isOpen.value = false;
  router.push({ name: 'login' });
};

const toggleSubscription = async () => {
  try {
    await userSubscribe();
    await authStore.fetchUser();
  } catch (error) {
    console.error("Error toggling subscription:", error);
  }
};

const toggle = () => isOpen.value = !isOpen.value;

const toggleClass = computed(() => isOpen.value === true ? 'show' : '');

</script>


<style scoped>
.nav-link.router-link-active {
  color: rgba(0, 0, 0, .9);
}

.subscription-label {
  color: gold;
  font-size: 1.2rem;
}
</style>
