<script setup lang="ts">
import Header from "~/components/layout/default/Header.vue"
import Footer from "~/components/layout/default/Footer.vue"

const {loadUser} = useAuth()
await loadUser()

const route = useRoute()
const heading = computed(() => route.meta.heading as {
  title?: string
  subtitle?: string
  breadcrumbs?: boolean
  align?: 'left' | 'center'
} | undefined)
</script>

<template>
  <div class="min-h-[100dvh] flex flex-col gap-8 md:gap-12 bg-gtr-pale text-gtr-base">
    <Header/>

    <div class="flex-1 w-full flex flex-col px-4 md:px-8 lg:px-16">
      <main class="flex-1 w-full flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto">
        <Heading v-if="heading?.title" v-bind="heading"/>
        <div class="flex-1 w-full flex flex-col">
          <slot/>
        </div>
      </main>
    </div>

    <Footer/>
  </div>
</template>