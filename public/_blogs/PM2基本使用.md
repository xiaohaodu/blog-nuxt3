# PM2负载均衡
## pm2安装与基本使用
### pm2安装（npm全局安装，node本身也会自带pm2）

- #### pm2安装，全局安装
  - `npm install pm2 -g`
- #### 查看版本 
  - `pm2 -V`
- #### 启动
  - `pm2 start app.js`
  - `pm2 start app.js --name test` *给进程起一个别名*
- #### 关闭
  - `pm2 start 0(id)`
- #### 从pm2中删除
  - `pm2 delete name`
- #### 重载和重启（无宕机的重载和重启）
  - `pm2 reload name`
  - `pm2 restart name`
- #### 查看详情
  - `pm2 show name`
- #### 多项目操作
  - 全部性操作
    ```
    - pm2 reload all 
    - pm2 stop all
    - pm2 restart all
    - pm2 delete all 
    ```
- #### 模式
  - mode：
    - Fork(默认模式)：只启动一个进程（单实例），用于多语言混编，python、php
    - Cluster：多实例多进程，只适用于node一种语言，不需要额外的端口配置
- #### 列出所有项目
  - `pm2 list`
- #### 实时监控查看资源
  - `pm2 monit`以图形化控制台形式反映出项目操作反馈
- #### 查看日志
  - `pm2 logs`
## 其他pm2知识可以查看官网 https://pm2.io/ 文档