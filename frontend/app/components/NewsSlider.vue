<script setup lang="ts">
interface NewsSliderProps {
  news: News[]
}

const { news } = defineProps<NewsSliderProps>()

const uiConfig = {
  viewport: 'overflow-hidden rounded-xl',
  prev: 'start-4! min-[1350px]:-start-12!',
  next: 'end-4! min-[1350px]:-end-12!',
  dots: 'static flex flex-wrap justify-center gap-2 mt-5',
  dot: 'w-6 h-2',
} as const
</script>

<template>
  <u-carousel
      v-if="news.length"
      v-slot="{ item }"
      :items="news"
      :autoplay="{ delay: 6000 }"
      loop
      arrows
      dots
      align="start"
      :ui=uiConfig
  >
    <news-slide :news="item as News"/>
  </u-carousel>
</template>