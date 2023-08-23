import { defineStore } from 'pinia';
import { ref } from 'vue';
import { allNews } from '../http/news-api';

export const useNewsStore = defineStore('newsStore', () => {
  const loader = ref(false);
  const newsData = ref([]);

  const fetchNews = async () => {
    loader.value = true;
    try {
      const responce = await allNews();
      newsData.value = responce.data;
    } catch (error) {
      console.error('Error', error);
    } finally {
      loader.value = false;
    }
  }

  fetchNews();

  return {
    loader,
    newsData,
    fetchNews,
  }
});
