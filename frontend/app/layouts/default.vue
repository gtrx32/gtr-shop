<template>
  <div class="min-h-screen grid grid-rows-[auto_1fr_auto] gap-6 bg-gray-50">
    <AppHeader />

    <main class="max-w-7xl mx-auto">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue';
import AppFooter from '../components/layout/AppFooter.vue';
</script>