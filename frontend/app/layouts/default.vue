<script setup lang="ts">
import Header from "~/components/layout/default/Header.vue";
import Footer from "~/components/layout/default/Footer.vue";
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col gap-8 sm:gap-12 bg-gray-50">
    <Header />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8">
      <slot />
    </main>

    <Footer />
  </div>
</template>