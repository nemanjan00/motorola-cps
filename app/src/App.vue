<script setup>
import AppSidebar from './components/AppSidebar.vue';
import AppHeader from './components/AppHeader.vue';
import ProgressOverlay from './components/ProgressOverlay.vue';
</script>

<template>
  <AppSidebar />
  <div class="main-content">
    <AppHeader />
    <div class="main-body">
      <router-view />
    </div>
  </div>
  <ProgressOverlay />
</template>
