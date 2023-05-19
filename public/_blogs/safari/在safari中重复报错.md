# Safari: "Fetch API cannot load due to access control checks" after reload

在部署nuxt3项目后，在windows系统浏览器正常访问，但是到macOS中浏览器就会无限刷新报错；"Fetch API cannot load due to access control checks" after reload

查看报错内容原因，则显示两个请求没有响应头；

而这两个请求则是因为代码特殊逻辑导致初始化加载连续请求三个同样接口，后两个接口出现错误，但是同样情况在windows系统下则请求都是正常的；

所以修复正确逻辑后就正常了，safari就可以正常访问了。