<template>
  <div style="max-width:520px;margin:40px auto;font-family:sans-serif;">
    <h2>Logout</h2>

    <button @click="doLogout" :disabled="loading" style="padding:10px 14px;">
      POST /api/logout
    </button>

    <div v-if="error" style="margin-top:12px;color:#b00020;white-space:pre-wrap;">
      {{ error }}
    </div>

    <div v-if="result" style="margin-top:12px;">
      <pre style="background:#f6f6f6;padding:12px;overflow:auto;">{{ result }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const error = ref<string | null>(null)
const result = ref<any>(null)

function getCookie(name: string): string | null {
  const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/[$()*+.?[\\\]^{|}-]/g, '\\$&') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : null
}

function xsrfHeader(): Record<string, string> {
  const token = getCookie('XSRF-TOKEN')
  return token ? { 'X-XSRF-TOKEN': token } : {}
}
async function ensureCsrf() {
  // если токен уже есть — ничего не делаем
  if (process.client && document.cookie.includes('XSRF-TOKEN=')) return

  await $fetch('/sanctum/csrf-cookie', { credentials: 'include' })
}
async function doLogout() {
  loading.value = true
  error.value = null
  result.value = null

  try {
    ensureCsrf()

    result.value = await $fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
      headers: xsrfHeader(),
    })
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || JSON.stringify(e, null, 2)
  } finally {
    loading.value = false
  }
}
</script>