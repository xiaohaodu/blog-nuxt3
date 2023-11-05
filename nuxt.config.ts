export default defineNuxtConfig({
  alias: {
    assets: '/assets',
    public: '/public',
  },
  nitro: {
    preset: 'node-server',
  },
  typescript: {
    typeCheck: true,
  },
  vite: {
    build: {
      assetsInlineLimit: 0, // 图片转 base64 编码的阈值
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-CN',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no',
        },
        { name: 'baidu-site-verification', content: 'codeva-JXLMMF0sXP' }, //百度快速收录
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        { src: '/baidu-analytics.js' }, //添加百度分析
      ],
    },
  },
  routeRules: {
    '/three/**': { ssr: false },
    '/game/**': { ssr: false },
  },
  plugins: [],
  build: {
    transpile: ['three'],
  },
  modules: ['@element-plus/nuxt', '@nuxtjs/tailwindcss'],
  css: ['@/assets/theme/theme.scss'],
  tailwindcss: {
    cssPath: './assets/css/tailwind.css',
  },
  runtimeConfig: {
    public: {
      githubAccess: {
        clientId: 'Iv1.5999dbc8911f0be3',
        clientSecret: 'b217aad003ec30bea365e2f103eee2079f1cad8e',
        redirectUrl: 'http://localhost:3000/api/github/auth',
      },
    },
  },
});
