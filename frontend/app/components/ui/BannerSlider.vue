<script setup lang="ts">
import type {Banner} from '~/types/banner'

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
          prev: 'start-4! min-[1350px]:-start-12!',
          next: 'end-4! min-[1350px]:-end-12!',
          dot: 'w-6 h-2'
        }"
    >
      <UiBannerSlide :banner="item as Banner"/>
    </UCarousel>
  </div>
</template>