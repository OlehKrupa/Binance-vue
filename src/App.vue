<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>