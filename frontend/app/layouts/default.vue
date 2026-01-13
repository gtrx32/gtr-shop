<script setup lang="ts">
import AppHeader from '../components/layout/AppHeader.vue';
import AppFooter from '../components/layout/AppFooter.vue';
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col gap-6 bg-gray-50">
    <AppHeader />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>