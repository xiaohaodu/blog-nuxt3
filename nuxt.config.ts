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
                { src: "/analytics.js" },
            ]
        }
    },
    routeRules: {
        '/three/**': { ssr: false },
        '/game/**': { ssr: false }
    },
    plugins: [
        { src: "~/plugins/three" },
        { src: "~/plugins/phaser" }
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
})
