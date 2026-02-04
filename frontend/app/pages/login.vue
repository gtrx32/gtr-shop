<!-- pages/login.vue -->
<script setup lang="ts">
const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const {login, actionPending, error} = useAuth()

async function onSubmit() {
  await login({
    email: form.email,
    password: form.password,
    remember: form.remember,
  } as any)
}
</script>

<template>
  <div class="flex items-center justify-center p-4">
    <UCard class="w-full max-w-sm">
      <template #header>
        <div class="text-lg font-semibold">Вход</div>
      </template>

      <UForm :state="form" @submit.prevent="onSubmit" class="mt-2">
        <!-- Визуальный стек формы -->
        <div class="space-y-5">
          <!-- Поля (можно сделать плотнее отдельной обёрткой) -->
          <div class="space-y-4">
            <UInput
                v-model="form.email"
                type="email"
                autocomplete="email"
                placeholder=""
                :ui="{ base: 'peer' }"
                class="w-full"
            >
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
              >
                <span class="inline-flex bg-default px-1">Email address</span>
              </label>
            </UInput>

            <UInput
                v-model="form.password"
                type="password"
                autocomplete="current-password"
                placeholder=""
                :ui="{ base: 'peer' }"
                class="w-full"
            >
              <label
                  class="pointer-events-none absolute left-0 -top-2.5 text-highlighted text-xs font-medium px-1.5 transition-all peer-focus:-top-2.5 peer-focus:text-highlighted peer-focus:text-xs peer-focus:font-medium peer-placeholder-shown:text-sm peer-placeholder-shown:text-dimmed peer-placeholder-shown:top-1.5 peer-placeholder-shown:font-normal"
              >
                <span class="inline-flex bg-default px-1">Password</span>
              </label>
            </UInput>
          </div>

          <UCheckbox v-model="form.remember" label="Запомнить меня" />

          <UAlert
              v-if="error"
              color="error"
              variant="soft"
              title="Ошибка входа"
              :description="typeof error === 'string' ? error : (error?.message ?? 'Не удалось выполнить вход')"
          />

          <!-- Кнопка по центру -->
          <div class="flex justify-center pt-2">
            <UButton
                type="submit"
                class="px-5"
                :loading="actionPending"
                :disabled="actionPending || !form.email || !form.password"
            >
              Войти
            </UButton>
          </div>
        </div>
      </UForm>
    </UCard>
  </div>
</template>

