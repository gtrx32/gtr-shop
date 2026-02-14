<script setup lang="ts">
interface HeadingProps {
  title: string
  subtitle?: string
  breadcrumbs?: boolean
  center?: boolean
}

const {
  title,
  subtitle,
  breadcrumbs = false,
  center = false
} = defineProps<HeadingProps>()
</script>

<template>
  <div class="space-y-4 w-full" :class="{ 'text-center': center }">
    <Breadcrumbs v-if="breadcrumbs" :center/>

    <div>
      <h1 class="text-4xl font-medium tracking-tight">{{ title }}</h1>
      <p v-if="subtitle" class="mt-2 text-md text-gtr-toned">{{ subtitle }}</p>
    </div>

    <div v-if="center" class="flex items-center justify-center gap-3 mt-3 w-full">
      <div class="h-px flex-1 bg-gradient-to-r from-transparent to-gtr-soft"/>
      <span class="h-1.5 w-1.5 rounded-full bg-gtr-dimmed shadow-sm shrink-0"/>
      <div class="h-px flex-1 bg-gradient-to-r from-gtr-soft to-transparent"/>
    </div>

    <div v-else class="flex items-center gap-2 mt-3">
      <span class="h-1.5 w-1.5 rounded-full bg-gtr-dimmed shadow-sm"/>
      <div class="h-px flex-1 bg-gradient-to-r from-gtr-soft to-transparent"/>
    </div>

  </div>
</template>