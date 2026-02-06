<script setup lang="ts">
import { z } from 'zod'

const { login, actionPending, error } = useAuth()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)

const formRef = ref()

const schema = z.object({
  email: z.string().trim().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().trim().min(1, 'Введите пароль').min(6, 'Минимум 6 символов'),
  remember: z.boolean().optional(),
})

async function onSubmit() {
  await login({
    email: form.email.trim(),
    password: form.password.trim(),
    remember: form.remember,
  })
  if (!error.value) {
    await navigateTo('/')
  }
}
</script>

<template>
  <UCard class="w-full max-w-sm">
    <template #header>
      <div class="text-xl font-semibold">Вход</div>
    </template>

    <UForm
        ref="formRef"
        :state="form"
        :schema="schema"
        @submit.prevent="onSubmit"
        class="space-y-3"
    >
      <UFormField name="email" label="Электронная почта" :ui="{ error: 'mt-0'}">
        <UInput
            v-model="form.email"
            placeholder="address@mail.ru"
            class="w-full"
            :ui="{ base: 'py-2 focus-visible:ring-0.5 transition-[box-shadow] duration-200' }"
        />
      </UFormField>

      <UFormField name="password" label="Пароль" :ui="{ error: 'mt-0'}">
        <UInput
            v-model="form.password"
            class="w-full"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ base: 'py-2 focus-visible:ring-0.5 transition-[box-shadow] duration-200' }"
        >
          <template #trailing>
            <UButton variant="link" size="xl" @click="showPassword = !showPassword">
              <icon :name="showPassword ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" class="text-xl" />
            </UButton>
          </template>
        </UInput>
      </UFormField>

      <UCheckbox label="Запомнить меня" v-model="form.remember" />

      <UAlert v-if="error" color="error" variant="subtle" :description="error" />

      <div class="flex justify-center">
        <UButton
            variant="solid"
            type="submit"
            :loading="actionPending"
            :disabled="actionPending || (formRef?.errors?.length > 0)"
            size="xl"
            class="px-5"
        >
          Войти
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>