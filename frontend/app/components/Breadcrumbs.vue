<script setup lang="ts">
interface BreadcrumbsProps {
  center?: boolean
}

interface BreadcrumbItem {
  label: string
  to?: string
}

const {center = false} = defineProps<BreadcrumbsProps>()

const route = useRoute()
const router = useRouter()

function labelForPath(path: string): string {
  const record = router.getRoutes().find(record => record.path === path)
  return record?.meta?.breadcrumb as string
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const path = route.path.replace(/\/+$/, '') || '/'

  if (path === '/') {
    return []
  }

  const items: BreadcrumbItem[] = [{label: 'Главная', to: '/'}]

  let trail = ''
  for (const segment of path.split('/').filter(Boolean)) {
    trail += `/${segment}`
    const label = labelForPath(trail)
    if (label) items.push({label, to: trail})
  }

  const current = route?.meta?.breadcrumb as string
  if (current) {
    const last = items[items.length - 1]
    if (last && last.to !== path) {
      items.push({label: current, to: path})
    }
  }

  const last = items.at(-1)
  if (last) last.to = undefined

  return items
})
</script>

<template>
  <nav class="flex flex-wrap items-center gap-2 text-sm text-gtr-toned" :class="{ 'justify-center': center }">
    <span v-for="(item, index) in breadcrumbs" :key="`${item.label}-${index}`" class="flex items-center gap-2">
      <nuxt-link v-if="item.to" :to="item.to" class="hover:text-gtr-base">
        {{ item.label }}
      </nuxt-link>
      <span v-else class="text-gtr-base font-medium">
        {{ item.label }}
      </span>
      <span v-if="index < breadcrumbs.length - 1" class="select-none text-gtr-dimmed">/</span>
    </span>
  </nav>
</template>