export default defineNuxtConfig({
    alias: {
        "assets": "/assets",
        "public": "/public",
    },
    nitro: {
        preset: 'node-server'
    },
    vite: {
        build: {
            assetsInlineLimit: 0 // 图片转 base64 编码的阈值
        }
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'zh-CN'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'referrer', content: 'no-referrer' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
        }
    },
    routeRules: {
        '/three/**': { ssr: false },
        '/game/**': { ssr: false }
    },
    plugins: [
    ],
    build: {
        transpile: ["three"],
    },
    modules: [
        '@element-plus/nuxt',
    ],
    css: [
        '@/assets/theme/theme.scss',
    ],
});
