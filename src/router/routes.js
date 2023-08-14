// import LoginPage from "../pages/LoginPage.vue";
// import RegisterPage from "../pages/RegisterPage.vue";
// import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue";
// import DashboardPage from "../pages/DashboardPage.vue";
// import HomePage from "../pages/HomePage.vue";
// import PreferencesPage from "../pages/PreferencesPage.vue";
// import { RouterView } from "vue-router";
// import Tr from "../i18n/translation"

// const routes = [
//   {
//     path: "/:locale?",
//     component: RouterView,
//     beforeEnter: Tr.routeMiddleware,
//     children: [
//       {
//         path: "home",
//         component: HomePage,
//         name: "homepage",
//       },
//       {
//         path: "dashboard",
//         component: DashboardPage,
//         name: "dashboard",
//         meta: {
//           auth: true,
//         },
//       },
//       {
//         path: "preferences",
//         component: PreferencesPage,
//         name: "preferences",
//         meta: {
//           auth: true,
//         },
//       },
//       {
//         path: "login",
//         component: LoginPage,
//         name: "login",
//         meta: {
//           guest: true,
//         },
//       },
//       {
//         path: "register",
//         component: RegisterPage,
//         name: "register",
//         meta: {
//           guest: true,
//         },
//       },
//       {
//         path: ":notFound(.*)",
//         name: "error.404",
//         component: NotFoundErrorPage,
//       },
//     ]
//   }
// ];

// export default routes;
