<template>
  <div class="news-item" @click="redirectToSource">
    <div class="news-content">
      <div class="news-image-container">
        <img :src="newsItem.image" alt="News Image" class="news-image" />
      </div>
      <div class="news-details">
        <div class="news-meta">
          {{ formatDate(newsItem.published_at) }} | {{ extractDomain(newsItem.source) }} | {{ newsItem.category }}
        </div>
        <h6 v-html="decodeHTML(newsItem.title)"></h6>
        <p class="news-content-text" v-html="decodeHTML(newsItem.content)"></p>
      </div>
    </div>
  </div>
</template>

<script>
import he from 'he';

export default {
  props: {
    newsItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    redirectToSource() {
      window.open(this.newsItem.source, '_blank');
    },
    formatDate(dateString) {
      const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', options);
    },
    extractDomain(url) {
      const match = url.match(/^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i);
      if (match) {
        const domain = match[1];
        const parts = domain.split('.');
        return parts[0];
      }
      return url;
    },
    decodeHTML(html) {
      return he.decode(html);
    },
  },
};
</script>
  
<style scoped>
.news-item {
  width: 100%;
  height: 150px;
  margin-inline-end: 10px ;
  padding-block: 10px;
  cursor: pointer;
  display: flex;
}

.news-content {
  display: flex;
  flex-direction: row;
}

.news-image-container {
  width: 35%;
  height: 100%;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-details {
  flex: 1;
  padding-left: 10px;
  overflow: hidden;
}

.news-meta {
  font-size: 12px;
  margin-bottom: 4px;
}
</style>
  