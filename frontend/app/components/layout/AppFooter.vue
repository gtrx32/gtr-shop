<script setup lang="ts">

</script>

<template>
  <footer class="bg-neutral-900">
    <div class="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12">
      <div
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center md:text-left items-center md:items-start">
        <div class="space-y-4">
          <nuxt-link
              to="/"
              class="inline-block font-blazma font-bold italic text-3xl tracking-widest text-neutral-300"
          >
            GTRSHOP
          </nuxt-link>
          <p class="text-neutral-300 leading-relaxed max-w-sm mx-auto md:mx-0">
            Магазин по продаже ничего.
          </p>
          <div class="flex items-center justify-center md:justify-start gap-3">
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-300">
              <Icon name="mdi:telegram" class="text-2xl text-inherit"/>
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-300">
              <Icon name="mdi:vk" class="text-2xl text-inherit"/>
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-300">
              <Icon name="mdi:instagram" class="text-2xl text-inherit"/>
            </a>
          </div>
        </div>

        <div class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10 md:col-span-1 lg:col-span-2">
          <div class="space-y-3">
            <div class="font-medium text-neutral-300">Навигация</div>
            <nav class="flex flex-col items-center md:items-start gap-3 text-sm text-neutral-500">
              <nuxt-link to="/catalog">Каталог</nuxt-link>
              <nuxt-link to="/news">Новости</nuxt-link>
              <nuxt-link to="/contacts">Контакты</nuxt-link>
              <nuxt-link to="/cart">Корзина</nuxt-link>
            </nav>
          </div>

          <div class="space-y-3">
            <div class="font-medium text-neutral-300">Покупателям</div>
            <nav class="flex flex-col items-center md:items-start gap-3 text-sm text-neutral-500">
              <nuxt-link to="/conditions">Доставка и оплата</nuxt-link>
              <nuxt-link to="/returns">Возврат и обмен</nuxt-link>
              <nuxt-link to="/faq">FAQ</nuxt-link>
              <nuxt-link to="/about">Отзывы</nuxt-link>
            </nav>
          </div>
        </div>

        <div class="space-y-3">
          <div class="font-medium text-neutral-300">Контакты</div>
          <div class="flex flex-col items-center md:items-start gap-3 text-sm">
            <a href="tel:+79990000000"
               class="flex items-center gap-2 justify-center md:justify-start">
              <Icon name="mdi:phone-outline" class="text-xl text-neutral-500"/>
              <span class="text-neutral-500">+7 (999) 000-00-00</span>
            </a>
            <a href="mailto:info@gtrshop.ru"
               class="flex items-center gap-2 justify-center md:justify-start">
              <Icon name="mdi:email-outline" class="text-xl text-neutral-500"/>
              <span class="text-neutral-500">info@gtrshop.ru</span>
            </a>
            <a href="#"
               class="flex items-center gap-2 justify-center md:justify-start">
              <Icon name="mdi:map-marker-outline" class="text-xl text-neutral-500"/>
              <span class="text-neutral-500">
                Улица Есенина, дом Каруселина
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-neutral-800">
      <div class="px-4 sm:px-8 lg:px-16 py-4 sm:py-5 lg:py-6 text-sm
               flex flex-col-reverse gap-3
               items-center text-center
               md:flex-row md:justify-between md:items-center md:text-left"
      >
        <div class="text-neutral-500">
          © {{ new Date().getFullYear() }} GTRSHOP. Все права защищены.
        </div>
        <div class="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          <nuxt-link to="/privacy" class="text-neutral-500">
            Политика конфиденциальности
          </nuxt-link>
          <nuxt-link to="/terms" class="text-neutral-500">
            Пользовательское соглашение
          </nuxt-link>
          <nuxt-link to="/offer" class="text-neutral-500">
            Публичная оферта
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>