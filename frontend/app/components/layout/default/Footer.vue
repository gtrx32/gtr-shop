<script setup lang="ts">

</script>

<template>
  <footer class="shadow-[0_-4px_6px] shadow-gtr-soft text-gtr-muted">
    <div class="px-4 sm:px-8 lg:px-16 py-8 sm:py-10 lg:py-12">
      <div
          class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center md:text-left items-center md:items-start">
        <div class="space-y-4">
          <nuxt-link
              to="/"
              class="inline-block font-blazma font-bold italic text-3xl tracking-widest"
          >
            GTRSHOP
          </nuxt-link>
          <p class="leading-relaxed max-w-sm mx-auto md:mx-0">
            Магазин по продаже ничего.
          </p>
          <div class="flex items-center justify-center md:justify-start gap-3">
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gtr-hover">
              <Icon name="mdi:telegram" class="text-2xl text-inherit"/>
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gtr-hover">
              <Icon name="mdi:vk" class="text-2xl text-inherit"/>
            </a>
            <a href="#" class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gtr-hover">
              <Icon name="mdi:instagram" class="text-2xl text-inherit"/>
            </a>
          </div>
        </div>

        <div class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10 md:col-span-1 lg:col-span-2">
          <div class="space-y-3">
            <div class="font-medium text-gtr-base">Навигация</div>
            <nav class="flex flex-col items-center md:items-start gap-3 text-sm">
              <nuxt-link to="/catalog" class="hover:text-gtr-contrast">Каталог</nuxt-link>
              <nuxt-link to="/news" class="hover:text-gtr-contrast">Новости</nuxt-link>
              <nuxt-link to="/contacts" class="hover:text-gtr-contrast">Контакты</nuxt-link>
              <nuxt-link to="/cart" class="hover:text-gtr-contrast">Корзина</nuxt-link>
            </nav>
          </div>

          <div class="space-y-3">
            <div class="font-medium text-gtr-base">Покупателям</div>
            <nav class="flex flex-col items-center md:items-start gap-3 text-sm">
              <nuxt-link to="/conditions" class="hover:text-gtr-contrast">Доставка и оплата</nuxt-link>
              <nuxt-link to="/returns" class="hover:text-gtr-contrast">Возврат и обмен</nuxt-link>
              <nuxt-link to="/faq" class="hover:text-gtr-contrast">FAQ</nuxt-link>
              <nuxt-link to="/about" class="hover:text-gtr-contrast">Отзывы</nuxt-link>
            </nav>
          </div>
        </div>

        <div class="space-y-3">
          <div class="font-medium text-gtr-base">Контакты</div>
          <div class="flex flex-col items-center md:items-start gap-3 text-sm">
            <a href="tel:+79990000000"
               class="flex items-center gap-2 justify-center md:justify-start hover:text-gtr-contrast">
              <Icon name="mdi:phone-outline" class="text-xl"/>
              <span>+7 (999) 000-00-00</span>
            </a>
            <a href="mailto:info@gtrshop.ru"
               class="flex items-center gap-2 justify-center md:justify-start hover:text-gtr-contrast">
              <Icon name="mdi:email-outline" class="text-xl"/>
              <span>info@gtrshop.ru</span>
            </a>
            <a href="#"
               class="flex items-center gap-2 justify-center md:justify-start hover:text-gtr-contrast">
              <Icon name="mdi:map-marker-outline" class="text-xl"/>
              <span>
                Улица Есенина, дом Каруселина
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gtr-soft">
      <div class="px-4 sm:px-8 lg:px-16 py-4 sm:py-5 lg:py-6 text-sm
               flex flex-col-reverse gap-3
               items-center text-center
               md:flex-row md:justify-between md:items-center md:text-left"
      >
        <div>
          © {{ new Date().getFullYear() }} GTRSHOP. Все права защищены.
        </div>
        <div class="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
          <nuxt-link to="/privacy" class="hover:text-gtr-contrast">
            Политика конфиденциальности
          </nuxt-link>
          <nuxt-link to="/terms" class="hover:text-gtr-contrast">
            Пользовательское соглашение
          </nuxt-link>
          <nuxt-link to="/offer" class="hover:text-gtr-contrast">
            Публичная оферта
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>