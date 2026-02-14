<script setup lang="ts">
interface BannerSliderProps {
  banners: Banner[]
}

const {banners} = defineProps<BannerSliderProps>()

const uiConfig = {
  viewport: 'overflow-hidden rounded-xl',
  prev: 'start-4! min-[1350px]:-start-12!',
  next: 'end-4! min-[1350px]:-end-12!',
  dots: 'static flex flex-wrap justify-center gap-2 mt-5',
  dot: 'w-6 h-2'
} as const
</script>

<template>
  <u-carousel
      v-if="banners.length"
      v-slot="{ item }"
      :items="banners"
      :autoplay="{ delay: 4000 }"
      loop
      arrows
      dots
      :ui=uiConfig
  >
    <banner-slide :banner="item as Banner"/>
  </u-carousel>
</template>