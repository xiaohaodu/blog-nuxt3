# <center>以NUXT3为基础构建的网站 <br/>（非纯静态，为node-server项目）</center>

## 文章以md格式编写，网站解析展示

- 文章存储位置

  > public下的\_blog文件夹作为文章的存储文件夹

  > 可以建立子文件夹来分类文章，调用server接口可以解析获取文章文件树来渲染目录

- 使用github action自动构建部署

- 使用PM2管理项目

- 目前网站接入了百度分析和谷歌分析来分析网站流量

- 目前github auth接入限制主要作为本人编写博客，无访客登录系统，访客github登录无修改权限

- 在线编写博客主要利用github api推送和github action自动构建部署完成，故文章推送实时性延后

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
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```
