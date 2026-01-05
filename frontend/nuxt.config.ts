// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},

    runtimeConfig: {
        public: {
            backendUrl: process.env.BACKEND_URL,
            appUrl: process.env.APP_URL,
        },
    },

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'GtrShop',
        },
    },

    css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
    modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],
});