export default defineNuxtConfig({
    alias: {
        "assets": "/assets",
        "public": "/public",
    },
    app: {
        head: {
            htmlAttrs: {
                lang: 'zh-CN'
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no' },
                { name: 'referrer', content: 'no-referrer' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            script: [
                // Google Analytics Code
                {
                    src: "https://www.googletagmanager.com/gtag/js?id=G-6VDYL7QTRW",
                    async: true,
                },
            ]
        }
    },
    routeRules: {
        '/three/**': { ssr: false }
    },
    modules: [
        '@element-plus/nuxt',
    ],
    css: [
        '@/assets/theme/theme.scss',
    ],
})
