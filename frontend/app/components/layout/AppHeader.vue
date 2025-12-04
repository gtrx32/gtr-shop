<template>
  <header class="sticky top-0 flex gap-28 justify-between items-center px-16 py-6 bg-gray-50 shadow-lg">
    <div class="flex-0 flex items-center gap-16">
      <nuxt-link to="/" class="font-blazma font-bold italic text-3xl tracking-widest">GTRSHOP</nuxt-link>
    </div>

    <div class="flex-1 flex items-center gap-16">
      <nav class="flex items-center gap-8">
        <nuxt-link to="/catalog" class="text-lg">Главная</nuxt-link>
        <nuxt-link to="/catalog" class="text-lg">Каталог</nuxt-link>
        <nuxt-link to="/news" class="text-lg">Новости</nuxt-link>
        <nuxt-link to="/contacts" class="text-lg">Контакты</nuxt-link>
      </nav>
    </div>

    <div class="flex-0 flex items-center gap-8">
      <div class="flex items-center gap-2 cursor-pointer relative" @click="open = !open" ref="menuRef">
        <div class="flex flex-col leading-none text-right select-none">
          <span>Иван Иванов</span>
          <span class="text-sm text-neutral-500">email@example.com</span>
        </div>
        <Icon name="mdi:user" class="text-4xl scale-110"/>
        <div v-if="open" class="absolute w-full left-0 top-100 bg-white shadow-lg top-full z-10 border rounded-2xl border-neutral-300 overflow-hidden">
          <nuxt-link class="block px-4 py-2" to="/profile">
            Профиль
          </nuxt-link>
          <nuxt-link class="block px-4 py-2" to="/orders">
            Мои заказы
          </nuxt-link>
          <nuxt-link class="block px-4 py-2" to="/reviews">
            Мои отзывы
          </nuxt-link>
          <button class="block flex gap-2 items-center px-4 py-2 w-full">
            Выйти <Icon name="mdi:exit-to-app" class="text-xl"/>
          </button>
        </div>
      </div>

      <nuxt-link to="/cart" class="flex items-center p-2 rounded-full">
        <Icon name="mdi:cart-outline" class="text-3xl"/>
      </nuxt-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const open = ref(false);
const menuRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>