import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import HomePage from "../pages/HomePage.vue";
import PreferencesPage from "../pages/PreferencesPage.vue";
const routes = [
  {
    path: "/",
    component: HomePage,
    name: "homepage",
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    name: "dashboard",
  },
  {
    path: "/preferences",
    component: PreferencesPage,
    name: "preferences",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "login",
    meta: {
      guest: true,
    },
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "register",
    meta: {
      guest: true,
    },
  },
  {
    path: "/:notFound(.*)",
    name: "error.404",
    component: NotFoundErrorPage,
  },
];

export default routes;
