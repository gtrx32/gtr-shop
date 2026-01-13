<script setup lang="ts">
import type { Banner } from '~/types/banner'

const {apiFetch} = useApi()

const banners = await apiFetch<Banner[]>('/api/banners')
</script>

<template>
  <UiBannerSlider :banners="banners"/>
</template>