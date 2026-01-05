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
      class="ui-button"
      v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<style scoped>
.ui-button {
  @apply rounded-lg border border-neutral-200 bg-white shadow-sm leading-none;
}
</style>
