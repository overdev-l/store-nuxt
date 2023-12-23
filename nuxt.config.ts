export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', "@nuxt/image", "nuxt-icon",'@element-plus/nuxt', '@pinia/nuxt'],
  css: [
    '~/assets/css/index.css',
    'normalize.css/normalize.css',
  ],
  elementPlus: { 
    importStyle: 'css',
  }
})