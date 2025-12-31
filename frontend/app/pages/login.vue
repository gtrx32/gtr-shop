<template>
  <div style="max-width:420px;margin:40px auto;font-family:sans-serif;">
    <h2>Login</h2>

    <label style="display:block;margin:10px 0;">
      Email
      <input
          v-model="email"
          type="email"
          autocomplete="email"
          style="width:100%;padding:8px;"
      />
    </label>

    <label style="display:block;margin:10px 0;">
      Password
      <input
          v-model="password"
          type="password"
          autocomplete="current-password"
          style="width:100%;padding:8px;"
      />
    </label>

    <button @click="onLogin" :disabled="loading" style="padding:10px 14px;">
      Login
    </button>

    <div v-if="error" style="margin-top:12px;color:#b00020;">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('admin@example.com')
const password = ref('admin123')

const { login, loading, error } = useAuth()

async function onLogin() {
  await login({
    email: email.value,
    password: password.value,
  })
}
</script>
