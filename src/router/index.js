import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useCurrencyStore } from "../stores/CurrencyStore";
import Tr from "../i18n/translation";

import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import HomePage from "../pages/HomePage.vue";
import PreferencesPage from "../pages/PreferencesPage.vue";
import { RouterView } from "vue-router";

const routes = [
  {
    path: "/:locale?",
    component: RouterView,
    beforeEnter: Tr.routeMiddleware,
    children: [
      {
        path: "home",
        component: HomePage,
        name: "home",
        meta: {
          guest: true,
        },
      },
      {
        path: "dashboard",
        component: DashboardPage,
        name: "dashboard",
        meta: {
          auth: true,
        },
      },
      {
        path: "preferences",
        component: PreferencesPage,
        name: "preferences",
        meta: {
          auth: true,
        },
      },
      {
        path: "login",
        component: LoginPage,
        name: "login",
        meta: {
          guest: true,
        },
      },
      {
        path: "register",
        component: RegisterPage,
        name: "register",
        meta: {
          guest: true,
        },
      },
      {
        path: ":notFound(.*)",
        name: "error.404",
        component: NotFoundErrorPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


// router.beforeEach(async (to, from) => {
//   const store = useAuthStore();
//   await store.fetchUser();
//   if (to.meta.auth && !store.isLoggedIn) {
//     return {
//       name: Tr.i18nRoute("login"),
//       query: {
//         redirect: to.fullPath,
//       },
//     };
//   } else if (to.meta.guest && store.isLoggedIn) {
//     return { name: Tr.i18nRoute("dashboard") };
//   }
// });   

export default router;
