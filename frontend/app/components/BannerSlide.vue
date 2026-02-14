<script setup lang="ts">
import type {Banner} from '~/types/banner'

interface Props {
  banner: Banner
}

defineProps<Props>()
</script>

<template>
  <NuxtLink :to="banner.target_url" class="block relative h-180 overflow-hidden rounded-xl">
    <img
        :src="banner.image ?? undefined"
        :alt="banner.title"
        class="h-full w-full object-cover"
        loading="lazy"
    />

    <div class="absolute left-0 bottom-0 z-10 p-6 md:p-8 max-w-[85%]">
      <h3 class="text-3xl md:text-4xl font-semibold leading-tight text-white">
        {{ banner.title }}
      </h3>
      <p class="mt-2 text-base md:text-xl leading-snug text-white/80">
        {{ banner.subtitle }}
      </p>
    </div>

    <div
        class="absolute inset-x-0 bottom-0 h-5/6 pointer-events-none bg-gradient-to-t from-black/95 via-black/60 to-transparent"/>
  </NuxtLink>
</template>