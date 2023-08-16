<template>
  <div class="news-container">
    <h2 class="news-title">News</h2>
    <div class="news-row" v-for="(row, index) in rows" :key="index">
      <NewsComponent
        v-for="newsItem in row"
        :key="newsItem.id"
        :newsItem="newsItem"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useNewsStore } from '../stores/NewsStore';
import NewsComponent from './NewsComponent.vue';

export default defineComponent({
  components: {
    NewsComponent,
  },
  setup() {
    const newsStore = useNewsStore();
    const newsList = newsStore.newsList;
    const rows = [];
    for (let i = 0; i < newsList.length; i += 2) {
      rows.push(newsList.slice(i, i + 2));
    }

    return {
      rows,
    };
  },
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
