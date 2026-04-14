# <center>以NUXT3为基础构建的博客网站 <br/>（非纯静态，为node-server项目）</center>

## 项目介绍

这是一个使用Nuxt 3构建的现代化博客网站，支持Markdown格式的博客编写和展示。

## 核心特性

* 博客以md格式编写，网站自动解析展示
* 支持博客分类和目录结构
* 使用GitHub Action自动构建部署
* 使用PM2管理项目进程
* 集成百度分析和谷歌分析
* 响应式设计，适配不同设备

## 博客存储位置

> public下的_blog文件夹作为博客的存储文件夹

> 可以建立子文件夹来分类博客，调用server接口可以解析获取博客文件树来渲染目录

## 技术栈

- [Nuxt 3](https://nuxt.com/) - 现代化的Vue框架
- [Vue 3](https://vuejs.org/) - 前端框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全的JavaScript
- [PM2](https://pm2.keymetrics.io/) - 进程管理工具

## 项目结构

```
blog-nuxt3/
├── app/                 # Nuxt 3应用目录
├── assets/              # 静态资源
├── components/          # Vue组件
├── composables/         # 组合式函数
├── layouts/             # 布局组件
├── pages/               # 页面组件
├── plugins/             # 插件
├── public/              # 公共静态文件
│   └── _blog/           # 博客存储目录
├── server/              # 服务器端代码
├── nuxt.config.ts       # Nuxt配置
├── package.json         # 项目依赖
└── tailwind.config.js   # Tailwind CSS配置
```

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

启动生产服务器：

```bash
npm run start
```

## 部署

项目使用GitHub Action自动构建部署，配置文件位于 `.github/workflows/` 目录。

## License

MIT
