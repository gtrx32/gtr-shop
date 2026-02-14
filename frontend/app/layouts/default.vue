<script setup lang="ts">
const {loadUser} = useAuth()
await loadUser()
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col gap-8 md:gap-12 bg-gtr-pale text-gtr-base">
    <layout-default-header />

    <div class="flex-1 w-full flex flex-col px-4 md:px-8 lg:px-16">
      <main class="flex-1 w-full flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto">
          <slot/>
      </main>
    </div>

    <layout-default-footer />
  </div>
</template>