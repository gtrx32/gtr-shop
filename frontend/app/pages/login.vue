<template>
  <div class="flex items-center justify-center px-4">
    <div class="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6">
      <h1 class="text-xl font-semibold">Вход</h1>

      <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
        <div class="space-y-1">
          <label class="text-sm text-zinc-700">Email</label>
          <input
              v-model.trim="form.email"
              type="email"
              autocomplete="email"
              required
              :disabled="actionPending"
              class="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:border-zinc-400 disabled:opacity-60"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm text-zinc-700">Пароль</label>
          <input
              v-model="form.password"
              type="password"
              autocomplete="current-password"
              required
              :disabled="actionPending"
              class="w-full rounded-xl border border-zinc-200 px-3 py-2 outline-none focus:border-zinc-400 disabled:opacity-60"
          />
        </div>

        <p v-if="error" class="text-sm text-red-600">
          {{ error }}
        </p>

        <button
            type="submit"
            :disabled="actionPending"
            class="w-full rounded-xl bg-zinc-900 px-4 py-2 text-white disabled:opacity-60"
        >
          {{ actionPending ? 'Входим…' : 'Войти' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Вход' })

const route = useRoute()
const router = useRouter()
const { login, actionPending, error } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const onSubmit = async () => {
  await login({
    email: form.email,
    password: form.password,
  })
}
</script>