<script setup lang="ts">
import {z} from 'zod'

definePageMeta({
  middleware: 'guest',
  footer: {
    variant: 'minimal',
  },
})

const {register, actionPending, error} = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const showPassword = ref(false)

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
  <heading title="Регистрация" center />
  <div class="flex-1 flex items-center justify-center">
    <u-form
        ref="formRef"
        :state="form"
        :schema="schema"
        @submit.prevent="onSubmit"
        class="space-y-6 w-full max-w-sm"
    >
      <u-form-field name="name" label="Имя">
        <u-input
            v-model="form.name"
            placeholder="Иван"
            size="xl"
            class="w-full"
            :ui="{base: 'py-3 rounded-xl focus-visible:ring-0 focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-gtr-soft transition duration-200'}"
        />
      </u-form-field>

      <u-form-field name="email" label="Электронная почта">
        <u-input
            v-model="form.email"
            placeholder="address@mail.ru"
            size="xl"
            class="w-full"
            :ui="{base: 'py-3 rounded-xl focus-visible:ring-0 focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-gtr-soft transition duration-200'}"
        />
      </u-form-field>

      <u-form-field name="password" label="Пароль">
        <u-input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            size="xl"
            class="w-full"
            :ui="{base: 'py-3 rounded-xl focus-visible:ring-0 focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-gtr-soft transition duration-200'}"
        >
          <template #trailing>
            <u-button
                variant="link"
                class="rounded-lg mr-1"
                @click="showPassword = !showPassword"
            >
              <icon name="mdi:eye-outline" v-show="!showPassword"/>
              <icon name="mdi:eye-off-outline" v-show="showPassword"/>
            </u-button>
          </template>
        </u-input>
      </u-form-field>

      <u-form-field name="password_confirmation" label="Подтверждение пароля">
        <u-input
            v-model="form.password_confirmation"
            class="w-full"
            :type="showPassword ? 'text' : 'password'"
            size="xl"
            :ui="{base: 'py-3 rounded-xl focus-visible:ring-0 focus-visible:shadow-[0_0_0_2px] focus-visible:shadow-gtr-soft transition duration-200'}"
        >
          <template #trailing>
            <u-button
                variant="link"
                class="rounded-lg mr-1"
                @click="showPassword = !showPassword"
            >
              <icon name="mdi:eye-outline" v-show="!showPassword"/>
              <icon name="mdi:eye-off-outline" v-show="showPassword"/>
            </u-button>
          </template>
        </u-input>
      </u-form-field>

      <u-alert
          v-if="error"
          color="error"
          variant="subtle"
          :description="error"
          class="rounded-xl"
      />

      <u-button
          type="submit"
          size="xl"
          block
          :loading="actionPending"
          :disabled="actionPending || (formRef?.errors?.length > 0)"
          class="rounded-xl py-3 mt-3"
      >
        Зарегистрироваться
      </u-button>
    </u-form>
  </div>
</template>