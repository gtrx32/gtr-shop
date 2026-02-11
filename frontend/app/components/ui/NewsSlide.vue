<script setup lang="ts">
import type {News} from '~/types/news'

interface Props {
  news: News
}

const props = defineProps<Props>()

const href = computed(() => `/news/${props.news.slug}`)
</script>

<template>
  <NuxtLink :to="href" class="block relative h-72 md:h-90 overflow-hidden rounded-xl">
    <img
        v-if="news.image"
        :src="news.image"
        :alt="news.title"
        class="h-full w-full object-cover"
        loading="lazy"
    />

    <div class="absolute left-0 bottom-0 z-10 space-y-2 p-6 md:p-8">
      <h3 class="text-2xl md:text-4xl font-semibold leading-tight text-white line-clamp-2 max-w-[92%]">
        {{ news.title }}
      </h3>

      <p class="text-sm md:text-lg leading-snug text-white/80 line-clamp-3 max-w-[92%]">
        {{ news.excerpt }}
      </p>

      <p class="text-xs md:text-sm text-white/70 text-end">
        {{ formatDate(news.active_from ?? news.created_at) }}
      </p>
    </div>

    <div
        class="absolute inset-x-0 bottom-0 h-5/6 pointer-events-none bg-gradient-to-t from-black/95 via-black/60 to-transparent"/>
  </NuxtLink>
</template>