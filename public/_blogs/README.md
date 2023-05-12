# <center>以NUXT3为基础构建的博客网站 <br/>（非纯静态，为node-server项目）</center>

## 博客以md格式编写，网站解析展示

* 博客存储位置
  
  >public下的_blog文件夹作为博客的存储文件夹
  
  >可以建立子文件夹来分类博客，调用server接口可以解析获取博客文件树来渲染目录

* 使用github action自动构建部署

* 使用PM2管理项目

* 目前网站接入了百度分析和谷歌分析来分析网站流量

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