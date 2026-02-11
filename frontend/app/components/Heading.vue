<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  subtitle?: string
  breadcrumbs?: boolean
}>(), {breadcrumbs: true})
</script>

<template>
  <div class="space-y-4 w-full">
    <Breadcrumbs v-if="props.breadcrumbs"/>

    <div>
      <h1 class="text-4xl font-medium tracking-tight">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-2 text-md text-gtr-toned">
        {{ subtitle }}
      </p>
    </div>

    <div class="flex items-center gap-2 mt-3">
      <span class="h-1.5 w-1.5 rounded-full bg-gtr-dimmed shadow-sm" />
      <div class="h-px flex-1 bg-gradient-to-r from-gtr-soft to-transparent" />
    </div>
  </div>
</template>