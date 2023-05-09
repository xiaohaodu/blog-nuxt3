module.exports = {
    apps: [
        {
            name: 'blog-nuxt3',
            port: 3000,
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            watch: true,
            watch_delay: 1000, // 文件变化后，延迟重启时间
        }
    ]
};
