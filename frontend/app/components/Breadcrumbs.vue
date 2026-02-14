<script setup lang="ts">
interface BreadcrumbsProps {
  center?: boolean
}

const {center} = withDefaults(defineProps<BreadcrumbsProps>(), {
  center: false,
})
</script>

<template>
  <nav class="flex flex-wrap items-center gap-2 text-sm text-gtr-toned" :class="{ 'justify-center': center }">
    <span class="flex items-center gap-2">
      <a href="/" class="hover:text-gtr-base">Главная</a>
      <span class="select-none text-gtr-dimmed">/</span>
    </span>

    <span class="flex items-center gap-2">
      <a href="/blog" class="hover:text-gtr-base">Скелет</a>
      <span class="select-none text-gtr-dimmed">/</span>
    </span>

    <span class="flex items-center gap-2">
      <a href="/blog/news" class="hover:text-gtr-base">Хлебных</a>
      <span class="select-none text-gtr-dimmed">/</span>
    </span>

    <span class="text-gtr-base font-medium">Крошек</span>
  </nav>
</template>
