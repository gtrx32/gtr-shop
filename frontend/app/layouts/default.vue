<script setup lang="ts">
import Header from "~/components/layout/default/Header.vue"
import Footer from "~/components/layout/default/Footer.vue"

const {loadUser} = useAuth()
await loadUser()

const route = useRoute()
const heading = computed(() => route.meta as HeadingMeta)
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col gap-8 sm:gap-12 bg-gtr-pale text-gtr-base">
    <Header/>

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 xl:px-0">
      <Heading
          v-if="heading.title"
          :title="heading.title"
          :subtitle="heading.subtitle"
          :breadcrumbs="heading.breadcrumbs"
      />

      <slot/>
    </main>

    <Footer/>
  </div>
</template>