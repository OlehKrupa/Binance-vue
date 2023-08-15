import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const errors = ref({});
  const isSubscribed = ref(false);

  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data;

      console.log(user.value.subscribed_at);

      if (user.value.subscribed_at) {
        isSubscribed.value = true;
      }
      else {
        isSubscribed.value = false;
      }
    } catch (error) {
      user.value = null;
    }
  };

  const handleLogin = async (credentials) => {
    await csrfCookie();
    try {
      await login(credentials);
      await fetchUser();
      errors.value = {};
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleRegister = async (newUser) => {

    try {
      await register(newUser);
      await handleLogin({
        email: newUser.email,
        password: newUser.password,
      });
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    errors,
    isLoggedIn,
    isSubscribed,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
});