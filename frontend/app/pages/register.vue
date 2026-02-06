<script setup lang="ts">
import { z } from 'zod'

const { register, actionPending, error } = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const formRef = ref()

const schema = z.object({
  name: z.string().trim().min(1, 'Введите имя').max(255, 'Максимум 255 символов'),
  email: z.string().trim().min(1, 'Введите email').email('Некорректный email').max(255, 'Максимум 255 символов'),
  password: z.string().trim().min(1, 'Введите пароль').min(8, 'Минимум 8 символов'),
  password_confirmation: z.string().trim().min(1, 'Подтвердите пароль'),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Пароли не совпадают',
  path: ['password_confirmation'],
})

async function onSubmit() {
  await register({
    name: form.name.trim(),
    email: form.email.trim(),
    password: form.password.trim(),
    password_confirmation: form.password_confirmation.trim(),
  })
}
</script>

<template>
  <UCard class="w-full max-w-sm">
    <template #header>
      <div class="text-xl font-semibold">Регистрация</div>
    </template>

    <UForm
        ref="formRef"
        :state="form"
        :schema="schema"
        @submit.prevent="onSubmit"
        class="space-y-3"
    >
      <UFormField name="name" label="Имя" :ui="{ error: 'mt-0' }">
        <UInput
            v-model="form.name"
            placeholder="Иван"
            class="w-full"
            :ui="{ base: 'py-2 focus-visible:ring-0.5 transition-[box-shadow] duration-200' }"
        />
      </UFormField>

      <UFormField name="email" label="Электронная почта" :ui="{ error: 'mt-0' }">
        <UInput
            v-model="form.email"
            placeholder="address@mail.ru"
            class="w-full"
            :ui="{ base: 'py-2 focus-visible:ring-0.5 transition-[box-shadow] duration-200' }"
        />
      </UFormField>

      <UFormField name="password" label="Пароль" :ui="{ error: 'mt-0' }">
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

      <UFormField name="password_confirmation" label="Подтверждение пароля" :ui="{ error: 'mt-0' }">
        <UInput
            v-model="form.password_confirmation"
            class="w-full"
            :type="showPasswordConfirm ? 'text' : 'password'"
            :ui="{ base: 'py-2 focus-visible:ring-0.5 transition-[box-shadow] duration-200' }"
        >
          <template #trailing>
            <UButton variant="link" size="xl" @click="showPasswordConfirm = !showPasswordConfirm">
              <icon :name="showPasswordConfirm ? 'mdi:eye-off-outline' : 'mdi:eye-outline'" class="text-xl" />
            </UButton>
          </template>
        </UInput>
      </UFormField>

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
          Зарегистрироваться
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>