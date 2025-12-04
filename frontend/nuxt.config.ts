// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'GtrShop',
    },
  },

  css: ['~/assets/css/main.css', '~/assets/css/fonts.css', '~/assets/css/reset.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
});