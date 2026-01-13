<script setup lang="ts">
import type { Banner } from '~/types/banner'
import type { News } from "~/types/news";
import type { ApiPaginatedResponse } from "~/types/api";

const {apiFetch} = useApi()

const banners = await apiFetch<Banner[]>('/api/banners')
const { data: news } = await apiFetch<ApiPaginatedResponse<News>>('/api/news')
</script>

<template>
  <div class="space-y-8 sm:space-y-12">
    <UiBannerSlider :banners="banners"/>
    <UiNewsSlider :news="news"/>
  </div>
</template>