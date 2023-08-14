import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { useAuthStore } from "../stores/auth";
import { useCurrencyStore } from "../stores/CurrencyStore";

const router = createRouter({
  routes,
  history: createWebHistory(),
  // linkActiveClass: "active",
});

router.beforeEach(async (to, from) => {
  const store = useAuthStore();
  await store.fetchUser();
  if (to.meta.auth && !store.isLoggedIn) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  } else if (to.meta.guest && store.isLoggedIn) {
    return { name: "dashboard" };
  }
});

router.beforeEach(async (to, from, next) => {
  const currencyStore = useCurrencyStore();
  await currencyStore.fetchPreferences();
  if (to.name !== "preferences" && currencyStore.preferences.length === 0) {
    next({
      name: "preferences",
      query: {
        redirect: to.fullPath,
      },
    });
  } else {
    next();
  }
});

export default router;
