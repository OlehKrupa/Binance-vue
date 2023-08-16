<template>
  <div class="news-container">
    <h2 class="news-title">News</h2>
    <Loader v-if="newsStore.loader" />
    <div v-else class="news-row" v-for="(row, index) in rows" :key="index">
      <NewsComponent
        v-for="newsItem in row"
        :key="newsItem.id"
        :newsItem="newsItem"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNewsStore } from '../stores/NewsStore';
import Loader from '../components/Loader.vue'
import NewsComponent from './NewsComponent.vue';

const newsStore = useNewsStore();

const rows = computed(() => {
  const sortedNewsData = [...newsStore.newsData].sort((a, b) => {
    return new Date(b.published_at) - new Date(a.published_at);
  });

  const computedRows = [];
  for (let i = 0; i < sortedNewsData.length; i += 2) {
    computedRows.push(sortedNewsData.slice(i, i + 2));
  }
  return computedRows;
});
</script>

<style scoped>
.news-container {
  display: flex;
  flex-wrap: wrap;
}

.news-title {
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
}

.news-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

@media (max-width: 800px) {
  .news-row {
    flex-direction: column;
  }
}
</style>
