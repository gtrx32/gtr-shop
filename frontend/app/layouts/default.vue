<script setup lang="ts">
import Header from "~/components/layout/default/Header.vue";
import Footer from "~/components/layout/default/Footer.vue";

const { loadUser } = useAuth()
await loadUser()
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col gap-8 sm:gap-12 bg-gtr-pale text-gtr-base">
    <Header />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 flex justify-center items-center">
      <slot />
    </main>

    <Footer />
  </div>
</template>