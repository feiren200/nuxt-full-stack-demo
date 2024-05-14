// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', '@pinia/nuxt', '@nuxt/eslint'],
  css: ['~/assets/normalize.css'],
  stylelint: {
    lintOnStart: false, // 專案啟動時不自動檢查所有相關檔案
    chokidar: true, // 監聽文件異動進行檢核（文件未列出此選項）
  },
  nitro: {
    plugins: ['@/server/index'],
  },
})
