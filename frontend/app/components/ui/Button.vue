<script setup lang="ts">
import { NuxtLink } from '#components'

const props = defineProps<{
  tag?: 'button' | 'nuxt-link'
}>()

const component = computed(() =>
    props.tag === 'nuxt-link' ? NuxtLink : 'button'
)
</script>

<template>
  <component
      :is="component"
      class="rounded-lg border border-zinc-200 bg-white shadow-sm leading-none"
      v-bind="$attrs"
  >
    <slot />
  </component>
</template>

