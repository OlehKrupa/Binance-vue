<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
    <div class="container py-2">
      <a class="navbar-brand">
        <span>{{ $t("nav.name") }}</span>
        <strong>{{ $t("nav.strong_name") }}</strong>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav" v-if="store.isLoggedIn">
          <li class="nav-item">
            <router-link :to="Tr.i18nRoute({ name: 'dashboard' })" class="nav-link">{{ $t("nav.dashboard") }}</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="Tr.i18nRoute({ name: 'preferences' })" class="nav-link">{{ $t("nav.prefs") }}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <template v-if="!store.isLoggedIn">
            <li class="nav-item">
              <router-link :to="Tr.i18nRoute({ name: 'login' })" class="btn btn-outline-secondary ms-2">{{ $t("nav.login") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="Tr.i18nRoute({ name: 'register' })" class="btn btn-danger ms-2">{{ $t("nav.register") }}</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="toggleClass" @click.prevent="toggle" href="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ store.user.first_name }}
                {{ store.user.last_name }}
              </a>
              <ul class="dropdown-menu" :class="toggleClass">
                <li><a href="#" class="dropdown-item" @click.prevent="logout">{{ $t("nav.logout") }}</a></li>
                <li><a href="#" class="dropdown-item" @click.prevent="toggleSubscription">
                    {{ store.isSubscribed ? $t("nav.unsubscribe") : $t("nav.subscribe") }}
                  </a></li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>

    <LanguageSwitcher/>

  </nav>
</template>

<script setup>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import Tr from "../i18n/translation";

import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { userSubscribe } from '../http/user-api';

const router = useRouter();
const store = useAuthStore();
const isOpen = ref(false);

const logout = async () => {
  await store.handleLogout();
  isOpen.value = false;
  router.push(Tr.i18nRoute({ name: 'login' }));
}
const toggleSubscription = async () => {
  try {
    await userSubscribe();
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
</style>