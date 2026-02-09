<script setup lang="ts">
const {theme, toggle: themeToggle} = useTheme()
</script>

<template>
  <footer class="shadow-[0_-4px_6px] shadow-gtr-soft ">
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
          <p class="leading-relaxed max-w-sm mx-auto md:mx-0 text-gtr-muted">
            Магазин по продаже ничего.
          </p>
          <div class="flex items-center justify-center md:justify-start gap-3">
            <u-button color="primary" square variant="ghost" size="xl" to="#">
              <icon name="mdi:telegram" class="text-2xl text-inherit"/>
            </u-button>
            <u-button color="primary" square variant="ghost" size="xl" to="#">
              <icon name="mdi:vk" class="text-2xl text-inherit"/>
            </u-button>
            <u-button color="primary" square variant="ghost" size="xl" to="#">
              <icon name="mdi:instagram" class="text-2xl text-inherit"/>
            </u-button>
          </div>
        </div>

        <div class="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10 md:col-span-1 lg:col-span-2">
          <div class="space-y-3">
            <div class="font-medium text-gtr-base">Навигация</div>
            <nav class="flex flex-col items-center md:items-start gap-3 text-sm">
              <u-button to="/catalog" color="primary" variant="link" size="md">Каталог</u-button>
              <u-button to="/news" color="primary" variant="link" size="md">Новости</u-button>
              <u-button to="/contacts" color="primary" variant="link" size="md">Контакты</u-button>
              <u-button to="/cart" color="primary" variant="link" size="md">Корзина</u-button>
            </nav>
          </div>

          <div class="space-y-3">
            <div class="font-medium text-gtr-base">Покупателям</div>
            <nav class="flex flex-col items-center md:items-start gap-3 text-sm">
              <u-button to="/conditions" color="primary" variant="link" size="md">Доставка и оплата</u-button>
              <u-button to="/returns" color="primary" variant="link" size="md">Возврат и обмен</u-button>
              <u-button to="/faq" color="primary" variant="link" size="md">FAQ</u-button>
              <u-button to="/about" color="primary" variant="link" size="md">Отзывы</u-button>
            </nav>
          </div>
        </div>

        <div class="space-y-3">
          <div class="font-medium text-gtr-base">Контакты</div>
          <div class="flex flex-col items-center md:items-start gap-3 text-sm">
            <u-button to="tel:+79990000000" color="primary" variant="link" size="md" class="gap-2">
              <icon name="mdi:phone-outline" class="text-xl"/>
              <span>+7 (999) 000-00-00</span>
            </u-button>
            <u-button to="mailto:info@gtrshop.ru" color="primary" variant="link" size="md" class="gap-2">
              <icon name="mdi:email-outline" class="text-xl"/>
              <span>info@gtrshop.ru</span>
            </u-button>
            <u-button to="#" color="primary" variant="link" size="md" class="gap-2">
              <icon name="mdi:map-marker-outline" class="text-xl"/>
              <span>
                Улица Есенина, дом Каруселина
              </span>
            </u-button>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-gtr-soft">
      <div
          class="px-4 sm:px-8 lg:px-16 py-4 sm:py-5 lg:py-6 text-sm
           flex flex-col gap-4 md:gap-8 items-center text-center
           md:flex-row md:items-center md:text-left text-gtr-muted"
      >
        <div>
          © {{ new Date().getFullYear() }} GTRSHOP. Все права защищены.
        </div>

        <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 md:ml-auto md:justify-end">
          <u-button to="/privacy" color="primary" variant="link" size="md">
            Политика конфиденциальности
          </u-button>
          <u-button to="/terms" color="primary" variant="link" size="md">
            Пользовательское соглашение
          </u-button>
          <u-button to="/offer" color="primary" variant="link" size="md">
            Публичная оферта
          </u-button>
        </div>

        <div class="md:ml-2">
          <u-button
              color="primary"
              variant="ghost"
              size="xl"
              square
              @click="themeToggle"
              aria-label="Переключить тему"
          >
            <ClientOnly>
              <icon
                  :key="theme"
                  mode="svg"
                  class="text-xl"
                  :name="theme === 'dark' ? 'line-md:moon-to-sunny-outline-transition' : 'line-md:sunny-outline-to-moon-transition'"
              />
              <template #fallback>
                <span class="block w-5 h-5" aria-hidden="true"></span>
              </template>
            </ClientOnly>
          </u-button>
        </div>
      </div>
    </div>
  </footer>
</template>