<template>
  <div style="max-width:520px;margin:40px auto;font-family:sans-serif;">
    <h2>Me</h2>

    <button @click="loadMe" :disabled="loading" style="padding:10px 14px;">
      Load /api/user
    </button>

    <div v-if="error" style="margin-top:12px;color:#b00020;white-space:pre-wrap;">
      {{ error }}
    </div>

    <div v-if="me" style="margin-top:12px;">
      <pre style="background:#f6f6f6;padding:12px;overflow:auto;">{{ me }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const error = ref<string | null>(null)
const me = ref<any>(null)

async function loadMe() {
  loading.value = true
  error.value = null
  me.value = null

  try {
    me.value = await $fetch('/api/user', {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: 'application/json' }
    })
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || JSON.stringify(e, null, 2)
  } finally {
    loading.value = false
  }
}
</script>