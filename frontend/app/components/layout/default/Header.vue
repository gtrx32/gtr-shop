<script setup lang="ts">
import { ref } from 'vue'

const { user, loadUser, logout } = useAuth()
await loadUser()

const isMobileMenuOpen = ref(false)

function closeMobile() {
  isMobileMenuOpen.value = false
}

async function handleLogout() {
  await logout()
  closeMobile()
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-gray-50 shadow-lg">
    <div class="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-5 lg:py-6">
      <nuxt-link
          to="/"
          class="font-blazma font-bold italic text-2xl sm:text-3xl tracking-widest"
      >
        GTRSHOP
      </nuxt-link>

      <div class="hidden md:flex flex-1 justify-center">
        <nav class="flex items-center gap-6 lg:gap-8">
          <nuxt-link to="/">Главная</nuxt-link>
          <nuxt-link to="/catalog">Каталог</nuxt-link>
          <nuxt-link to="/news">Новости</nuxt-link>
          <nuxt-link to="/contacts">Контакты</nuxt-link>
        </nav>
      </div>

      <div class="hidden md:flex items-center gap-3">
        <template v-if="user">
          <UiButton tag="nuxt-link" to="/cart" class="inline-flex items-center justify-center p-2">
            <Icon name="mdi:cart-outline" class="text-xl" />
          </UiButton>
          <UiButton tag="nuxt-link" to="/profile" class="inline-flex items-center justify-center gap-1 p-2">
            <span>{{ user.name }}</span>
            <Icon name="mdi:user" class="text-xl" />
          </UiButton>
          <UiButton tag="button" @click="handleLogout" class="inline-flex items-center justify-center p-2">
            <Icon name="mdi:exit-to-app" class="text-xl" />
          </UiButton>
        </template>

        <template v-else>
          <UiButton tag="nuxt-link" to="/login" class="inline-flex px-4 py-2">
            Вход
          </UiButton>
          <UiButton tag="nuxt-link" to="/register" class="inline-flex px-4 py-2">
            Регистрация
          </UiButton>
        </template>
      </div>

      <UiButton
          tag="button"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="inline-flex items-center gap-2 px-4 py-2 md:hidden"
      >
        <Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-xl" />
        <span>Меню</span>
      </UiButton>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-zinc-200 bg-gray-50">
      <div class="px-4 sm:px-8 py-4 space-y-3">
        <nav class="flex flex-col gap-1">
          <nuxt-link @click="closeMobile" to="/" class="py-2">Главная</nuxt-link>
          <nuxt-link @click="closeMobile" to="/catalog" class="py-2">Каталог</nuxt-link>
          <nuxt-link @click="closeMobile" to="/news" class="py-2">Новости</nuxt-link>
          <nuxt-link @click="closeMobile" to="/contacts" class="py-2">Контакты</nuxt-link>
        </nav>

        <template v-if="user">
          <UiButton
              tag="nuxt-link"
              to="/profile"
              @click="closeMobile"
              class="flex items-center gap-3 px-4 py-4 justify-start"
          >
            <Icon name="mdi:user" class="text-3xl" />
            <div>
              <div class="font-medium leading-tight">{{ user.name }}</div>
              <div class="text-sm text-zinc-500">{{ user.email }}</div>
            </div>
          </UiButton>

          <div class="grid grid-cols-2 gap-3">
            <UiButton
                tag="nuxt-link"
                to="/cart"
                @click="closeMobile"
                class="flex items-center justify-center gap-2 px-4 py-3"
            >
              <Icon name="mdi:cart-outline" class="text-xl" />
              <span>Корзина</span>
            </UiButton>
            <UiButton
                tag="button"
                @click="handleLogout"
                class="flex items-center justify-center gap-2 px-4 py-3"
            >
              <Icon name="mdi:exit-to-app" class="text-xl" />
              <span>Выйти</span>
            </UiButton>
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-2 gap-3">
            <UiButton
                tag="nuxt-link"
                to="/login"
                @click="closeMobile"
                class="flex items-center justify-center px-4 py-3"
            >
              Вход
            </UiButton>
            <UiButton
                tag="nuxt-link"
                to="/register"
                @click="closeMobile"
                class="flex items-center justify-center px-4 py-3"
            >
              Регистрация
            </UiButton>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>