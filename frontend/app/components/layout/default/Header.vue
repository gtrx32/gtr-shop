<script setup lang="ts">
import {ref} from 'vue'

const {user, loadUser, logout} = useAuth()
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
  <header class="sticky top-0 z-50 shadow-md shadow-gtr-soft bg-gtr-pale">
    <div class="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-5 lg:py-6">
      <nuxt-link
          to="/"
          class="font-blazma font-bold italic text-2xl sm:text-3xl tracking-widest hover:text-gtr-contrast"
      >
        GTRSHOP
      </nuxt-link>

      <div class="hidden md:flex flex-1 justify-center">
        <nav class="flex items-center gap-6 lg:gap-8">
          <u-button to="/" color="primary" variant="link" size="xl">Главная</u-button>
          <u-button to="/catalog" color="primary" variant="link" size="xl">Каталог</u-button>
          <u-button to="/news" color="primary" variant="link" size="xl">Новости</u-button>
          <u-button to="/contacts" color="primary" variant="link" size="xl">Контакты</u-button>
        </nav>
      </div>

      <div class="hidden md:flex items-stretch gap-3">
        <template v-if="user">
          <u-button to="/cart" color="primary" variant="ghost" size="xl">
            <icon name="mdi:cart-outline" class="text-xl"/>
          </u-button>
          <u-button to="/profile" color="primary" variant="ghost" size="xl">
            <span>{{ user.name }}</span>
            <icon name="mdi:user" class="text-xl"/>
          </u-button>
          <u-button @click="handleLogout" color="primary" variant="ghost" size="xl">
            <icon name="mdi:exit-to-app" class="text-xl"/>
          </u-button>
        </template>

        <template v-else>
          <u-button to="/login" color="primary" variant="ghost" size="xl">
            Вход
          </u-button>
          <u-button to="/register" color="primary" variant="ghost" size="xl">
            Регистрация
          </u-button>
        </template>
      </div>

      <u-button
          color="primary" variant="ghost" size="xl"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="md:hidden"
      >
        <icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-xl"/>
        <span>Меню</span>
      </u-button>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gtr-soft">
      <div class="px-4 sm:px-8 py-4 space-y-3">
        <nav class="flex flex-col gap-1">
          <u-button @click="closeMobile" to="/" color="primary" variant="link" size="xl">Главная</u-button>
          <u-button @click="closeMobile" to="/catalog" color="primary" variant="link" size="xl">Каталог</u-button>
          <u-button @click="closeMobile" to="/news" color="primary" variant="link" size="xl">Новости</u-button>
          <u-button @click="closeMobile" to="/contacts" color="primary" variant="link" size="xl">Контакты</u-button>
        </nav>

        <template v-if="user">
          <u-button
              to="/profile"
              @click="closeMobile"
              color="primary" variant="ghost" size="xl"
              class="flex justify-start gap-3 px-4 py-4"
          >
            <icon name="mdi:user" class="text-4xl"/>
            <div>
              <div class="font-medium leading-tight">{{ user.name }}</div>
              <div class="text-sm">{{ user.email }}</div>
            </div>
          </u-button>

          <div class="grid grid-cols-2 gap-3">
            <u-button
                to="/cart"
                @click="closeMobile"
                color="primary" variant="ghost" size="xl"
                class="flex px-4 py-4"
            >
              <icon name="mdi:cart-outline" class="text-xl"/>
              <span>Корзина</span>
            </u-button>
            <u-button
                @click="handleLogout"
                color="primary" variant="ghost" size="xl"
                class="flex px-4 py-4"
            >
              <icon name="mdi:exit-to-app" class="text-xl"/>
              <span>Выйти</span>
            </u-button>
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-2 gap-3">
            <u-button
                to="/login"
                @click="closeMobile"
                color="primary" variant="ghost" size="xl"
                class="flex px-4 py-4"
            >
              Вход
            </u-button>
            <u-button
                to="/register"
                @click="closeMobile"
                color="primary" variant="ghost" size="xl"
                class="flex px-4 py-4"
            >
              Регистрация
            </u-button>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>