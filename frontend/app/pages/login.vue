<script setup lang="ts">
import {z} from 'zod'

definePageMeta({
  middleware: 'guest',
  footer: {
    variant: 'minimal',
  },
})

const {login, actionPending, error} = useAuth()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const showPassword = ref(false)

const formRef = ref()

const schema = z.object({
  email: z.string().trim().min(1, 'Введите email').email('Некорректный email'),
  password: z.string().trim().min(1, 'Введите пароль'),
  remember: z.boolean().optional(),
})

async function onSubmit() {
  await login({
    email: form.email.trim(),
    password: form.password.trim(),
    remember: form.remember,
  })
}
</script>

<template>
  <heading title="Авторизация" center />
  <div class="flex-1 flex items-center justify-center">
    <u-form
        ref="formRef"
        :state="form"
        :schema="schema"
        @submit.prevent="onSubmit"
        class="space-y-6 w-full max-w-sm"
    >
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

      <u-checkbox label="Запомнить меня" v-model="form.remember"/>

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
          class="rounded-xl py-3"
      >
        Войти
      </u-button>
    </u-form>
  </div>
</template>