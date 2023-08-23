import { ref } from 'vue';
import { getPaymentSession } from '../http/user-api';

export function usePaymentStore() {
  const loading = ref(true);
  const sessionSubId = ref(null);
  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

  const getSession = async () => {
    loading.value = true;
    try {
      const res = await getPaymentSession();
      sessionSubId.value = res.data.sub.id;
      console.log(sessionSubId.value);
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  getSession();

  return {
    sessionSubId,
    publishableKey,
    loading,
  };
}
