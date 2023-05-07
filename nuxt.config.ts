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
                { name: "baidu-site-verification", content: "codeva-JXLMMF0sXP" },//百度快速收录
                { name: "referrer", content: "strict-origin-when-cross-origin" }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            script: [
                { src: '/baidu-analytics.js' }//添加百度分析
            ]
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
