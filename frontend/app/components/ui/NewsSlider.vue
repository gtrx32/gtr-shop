<script setup lang="ts">
import type { News } from '~/types/news'

interface Props {
  news: News[]
  delay?: number
}

withDefaults(defineProps<Props>(), {
  delay: 6000
})
</script>

<template>
  <UCarousel
      v-slot="{ item }"
      :items="news"
      :autoplay="{ delay }"
      loop
      arrows
      dots
      align="start"
      :ui="{
          viewport: 'overflow-hidden rounded-xl',
          item: 'basis-full md:basis-1/2',
          prev: 'start-4! min-[1350px]:-start-12!',
          next: 'end-4! min-[1350px]:-end-12!',
          dots: 'static flex flex-wrap justify-center gap-2 mt-5',
          dot: 'w-6 h-2'
        }"
  >
    <UiNewsSlide :news="item as News"/>
  </UCarousel>
</template>