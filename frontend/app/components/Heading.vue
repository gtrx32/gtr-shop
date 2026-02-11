<script setup lang="ts">
type HeadingProps = {
  title: string
  subtitle?: string
  breadcrumbs?: boolean
  align?: 'left' | 'center'
}

const props = withDefaults(defineProps<HeadingProps>(), {
  breadcrumbs: true,
  align: 'left',
})

const isCenter = computed(() => props.align === 'center')
</script>

<template>
  <div class="space-y-4 w-full" :class="{ 'text-center': isCenter }">
    <Breadcrumbs v-if="breadcrumbs"/>

    <div>
      <h1 class="text-4xl font-medium tracking-tight">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-2 text-md text-gtr-toned">
        {{ subtitle }}
      </p>
    </div>

    <div v-if="isCenter" class="flex items-center justify-center gap-3 mt-3 w-full">
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