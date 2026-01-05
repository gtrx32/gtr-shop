<template>
  <pre>{{ products }}</pre>
</template>

<script setup>
const { apiFetch } = useApi()

const { data: products } = await useAsyncData('products', () =>
    apiFetch('/api/products')
)
</script>
