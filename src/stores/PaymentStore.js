import { ref } from 'vue';
import { getPaymentSession, unStripe } from '../http/user-api';

import { useAuthStore } from './auth';

export function usePaymentStore() {
  const authStore = useAuthStore();

  const loading = ref(true);
  const sessionSubId = ref(null);
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  const getSession = async () => {
    loading.value = true;
    try {
      const res = await getPaymentSession();
      sessionSubId.value = res.data.sub.id;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const handleCancelPremium = async () => {
    unStripe();
    authStore.fetchUser();
  }

  getSession();

  return {
    sessionSubId,
    publishableKey,
    loading,
    handleCancelPremium,
  };
}
