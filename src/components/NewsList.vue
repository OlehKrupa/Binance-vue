<template>
  <div class="news-container">
    <Loader v-if="newsStore.loader" />
    <div v-else class="news-row" v-for="(row, index) in visibleRows" :key="index">
      <NewsComponent
        v-for="newsItem in row"
        :key="newsItem.id"
        :newsItem="newsItem"
      />
    </div>
    <button v-if="showMoreButton" @click="loadMoreNews" class="show-more-button">Show more</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useNewsStore } from '../stores/NewsStore';
import Loader from '../components/Loader.vue'
import NewsComponent from './NewsComponent.vue';

const newsStore = useNewsStore();
const rowsToShow = ref(1);
const visibleRows = computed(() => rows.value.slice(0, rowsToShow.value));
const showMoreButton = computed(() => rowsToShow.value < rows.value.length);

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

function loadMoreNews() {
  rowsToShow.value ++;
}
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
  padding-inline: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

/* @media (max-width: 1000px) {
  .news-row {
    flex-direction: column;
  }
} */

.show-more-button {
  margin: 10px auto;
  display: block;
  padding: 10px 30px;
  font-size: 16px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.show-more-button:hover {
  background-color: #0056b3;
}
</style>
