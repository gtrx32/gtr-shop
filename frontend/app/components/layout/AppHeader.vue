<template>
  <header class="sticky top-0 z-50 bg-gray-50 shadow-lg">
    <div class="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-5 lg:py-6">
      <div class="flex items-center gap-4 lg:gap-16">
        <nuxt-link to="/" class="font-blazma font-bold italic text-2xl sm:text-3xl tracking-widest">
          GTRSHOP
        </nuxt-link>
      </div>

      <div class="hidden md:flex flex-1 justify-center">
        <nav class="flex items-center gap-6 lg:gap-8">
          <nuxt-link to="/catalog" class="text-base lg:text-lg">Главная</nuxt-link>
          <nuxt-link to="/catalog" class="text-base lg:text-lg">Каталог</nuxt-link>
          <nuxt-link to="/news" class="text-base lg:text-lg">Новости</nuxt-link>
          <nuxt-link to="/contacts" class="text-base lg:text-lg">Контакты</nuxt-link>
        </nav>
      </div>

      <div class="flex items-center gap-2 sm:gap-4 lg:gap-8">
        <div class="hidden md:flex items-center gap-2 sm:gap-4 lg:gap-8">
          <div class="flex items-center gap-2 cursor-pointer relative" @click="toggleUserMenu" ref="menuRef">
            <div class="hidden lg:flex flex-col leading-none text-right select-none">
              <span>Иван Иванов</span>
              <span class="text-sm text-neutral-500">email@example.com</span>
            </div>
            <Icon name="mdi:user" class="text-3xl sm:text-4xl scale-110"/>
            <div
                v-if="isUserModalOpen"
                class="absolute right-0 top-full mt-2 w-56 bg-white shadow-lg z-10 border rounded-2xl border-neutral-300 overflow-hidden"
            >
              <nuxt-link class="block px-4 py-2" to="/profile">Профиль</nuxt-link>
              <nuxt-link class="block px-4 py-2" to="/orders">Мои заказы</nuxt-link>
              <nuxt-link class="block px-4 py-2" to="/reviews">Мои отзывы</nuxt-link>
              <button class="block flex gap-2 items-center px-4 py-2 w-full">
                Выйти
                <Icon name="mdi:exit-to-app" class="text-xl"/>
              </button>
            </div>
          </div>

          <nuxt-link to="/cart" class="flex items-center p-2 rounded-full">
            <Icon name="mdi:cart-outline" class="text-2xl sm:text-3xl"/>
          </nuxt-link>
        </div>

        <button
            class="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-neutral-200 shadow-sm"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" class="text-2xl"/>
          <span class="text-base">Меню</span>
        </button>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-neutral-200 bg-gray-50">
      <div class="px-4 sm:px-8 py-4 space-y-4">
        <nav class="flex flex-col gap-1">
          <nuxt-link @click="closeMobile" to="/catalog" class="py-2 text-base">Главная</nuxt-link>
          <nuxt-link @click="closeMobile" to="/catalog" class="py-2 text-base">Каталог</nuxt-link>
          <nuxt-link @click="closeMobile" to="/news" class="py-2 text-base">Новости</nuxt-link>
          <nuxt-link @click="closeMobile" to="/contacts" class="py-2 text-base">Контакты</nuxt-link>
        </nav>

        <div class="h-px bg-neutral-200"></div>

        <div class="grid grid-cols-2 gap-3">
          <nuxt-link
              @click="closeMobile"
              to="/cart"
              class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white border border-neutral-200 shadow-sm"
          >
            <Icon name="mdi:cart-outline" class="text-xl"/>
            <span>Корзина</span>
          </nuxt-link>

          <nuxt-link
              @click="closeMobile"
              to="/profile"
              class="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white border border-neutral-200 shadow-sm"
          >
            <Icon name="mdi:user" class="text-xl"/>
            <span>Профиль</span>
          </nuxt-link>
        </div>

        <div class="rounded-lg bg-white border border-neutral-200 shadow-sm overflow-hidden">
          <div class="px-4 py-3">
            <div class="font-medium leading-tight">Иван Иванов</div>
            <div class="text-sm text-neutral-500">email@example.com</div>
          </div>
          <div class="h-px bg-neutral-200"></div>

          <nuxt-link @click="closeMobile" class="block px-4 py-3" to="/orders">
            Мои заказы
          </nuxt-link>
          <nuxt-link @click="closeMobile" class="block px-4 py-3" to="/reviews">
            Мои отзывы
          </nuxt-link>

          <button class="w-full flex items-center gap-2 px-4 py-3">
            Выйти
            <Icon name="mdi:exit-to-app" class="text-xl"/>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {ref, onMounted, onBeforeUnmount} from "vue";

const isUserModalOpen = ref(false);
const isMobileMenuOpen = ref(false);
const menuRef = ref<HTMLElement | null>(null);

function closeMobile() {
  isMobileMenuOpen.value = false;
}

function toggleUserMenu() {
  isUserModalOpen.value = !isUserModalOpen.value;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (menuRef.value && !menuRef.value.contains(target)) {
    isUserModalOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>