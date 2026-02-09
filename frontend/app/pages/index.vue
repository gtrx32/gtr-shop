<script setup lang="ts">
const api = useApi()

const { data: banners } = await useAsyncData('banners', () =>
    api<Banner[]>('/api/banners')
)

const { data: news } = await useAsyncData('news', () =>
    api<PaginatedResponse<News>>('/api/news')
)
</script>

<template>
  <div class="space-y-8 sm:space-y-12">
    <UiBannerSlider :banners="banners ?? []"/>
    <UiNewsSlider :news="news?.data ?? []"/>
  </div>
</template>