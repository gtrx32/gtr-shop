<script setup lang="ts">
import type { Banner } from '~/types/banner'

interface Props {
  banners: Banner[]
  delay?: number
}

withDefaults(defineProps<Props>(), {
  delay: 4000
})
</script>

<template>
  <div class="pb-8">
    <UCarousel
        v-slot="{ item }"
        :items="banners"
        :autoplay="{ delay: delay ?? 4000 }"
        loop
        arrows
        dots
        :ui="{
        viewport: 'overflow-hidden rounded-xl',
        dot: 'w-6 h-2'
      }"
    >
      <UiSlide :banner="item as Banner" />
    </UCarousel>
  </div>
</template>
