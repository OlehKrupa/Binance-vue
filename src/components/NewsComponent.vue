<template>
    <div class="news-item" @click="redirectToSource">
      <div class="news-content">
        <div class="news-image-container">
          <img :src="newsItem.imageUrl" alt="News Image" class="news-image" />
        </div>
        <div class="news-details">
          <div class="news-meta">
            {{ newsItem.date }} | {{ newsItem.source }}
          </div>
          <h5>{{ newsItem.title }}</h5>
          <p class="news-content-text">{{ newsItem.content }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
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
    },
  };
  </script>
  
  <style scoped>
  .news-item {
    width: 50%;
    height: 150px;
    margin-inline: 10px;
    padding: 10px;
    cursor: pointer;
    display: flex;
  }
  
  .news-content {
    display: flex;
    flex-direction: row;
  }
  
  .news-image-container {
    width: 30%;
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
  