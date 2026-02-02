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
      class="rounded-lg border border-gtr-soft shadow-sm shadow-gtr-soft leading-none text-gtr-base hover:bg-gtr-hover cursor-pointer"
      v-bind="$attrs"
  >
    <slot />
  </component>
</template>