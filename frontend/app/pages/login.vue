<template>
  <div style="max-width:420px;margin:40px auto;font-family:sans-serif;">
    <h2>Login</h2>

    <label style="display:block;margin:10px 0;">
      Email
      <input v-model="email" type="email" autocomplete="email" style="width:100%;padding:8px;" />
    </label>

    <label style="display:block;margin:10px 0;">
      Password
      <input v-model="password" type="password" autocomplete="current-password" style="width:100%;padding:8px;" />
    </label>

    <button @click="doLogin" :disabled="loading" style="padding:10px 14px;">
      Login
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

const email = ref('admin@example.com')
const password = ref('admin123')
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

async function doLogin() {
  loading.value = true
  error.value = null
  result.value = null

  try {
    await $fetch('/sanctum/csrf-cookie', { credentials: 'include' })

    const loginRes = await $fetch('/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: xsrfHeader(),
      body: { email: email.value, password: password.value },
    })

    result.value = loginRes
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || JSON.stringify(e, null, 2)
  } finally {
    loading.value = false
  }
}
</script>